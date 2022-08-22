<template>
	<div class="flex flex-col h-full w-full justify-between">
		<div class="w-full h-full flex gap-14 bg-ocean-blue-light">
			<SideNav />
			<main class="h-full w-full md:py-7 gap-5 md:gap-8 flex flex-col px-2 md:px-0">
				<header class="sticky z-10 bg-ocean-blue-light top-7">
					<div class="flex justify-between gap-4 text-ocean-blue-dark">
						<RssIcon class="w-5" />
						<div class="flex-1">
							<input
								class="w-full outline-none bg-transparent text-sm align-baseline"
								type=""
								name=""
								@input="handleFileSearch"
								id="searchField"
								placeholder="Ctrl + k"
							/>
						</div>
						<div class="flex gap-5">
							<label for="searchField">
								<button>
									<SearchIcon class="w-5" />
								</button>
							</label>
							<input type="file" multiple hidden id="uploadField" @change="handleUpload" />
							<label for="uploadField" class="cursor-pointer">
								<button class="pointer-events-none justify-center items-center flex h-5 w-5">
									<UploadProgressBadge
										:class="'bg-none drop-shadow-none'"
										:displayStatus="uploadMeta.status"
										:percent-uploaded="uploadMeta.percent"
										@close="handleClose"
									/>
									<PlusCircleIcon class="w-5" />
								</button>
							</label>
							<label>
								<button>
									<StarIcon class="w-5" />
								</button>
							</label>
						</div>
					</div>
					<div class="py-5">
						<div class="cut hidden md:block"></div>
					</div>

					<!-- <nav class=""> -->
					<nav class="hidden md:block py-2 md:py-0">
						<div class="flex justify-between text-ocean-blue-dark">
							<div class="flex gap-2 md:gap-6 flex-1">
								<FileTypeFilter @file-filter-change="handleFileTypeFilter" />
							</div>

							<div class="flex items-center">
								<ViewSwitcher :file-view-type="mainStore.fileViewType" />
							</div>
						</div>
					</nav>
				</header>
				<main class="max-h-[calc(100%-110px)] md:max-h-[calc(100%-105px)">
					<div class="h-full outer relative">
						<AllFilesMenu
							:files="mainStore.filesOnDisplay"
							:handle-scroll="scrollDirection"
							:file-view-type="mainStore.fileViewType"
						>
						</AllFilesMenu>
					</div>
				</main>
			</main>

			<FilePreview
				:is-open="mainStore.previewStatus"
				:preview-file="mainStore.previewFileInformation"
				:close-preview="() => mainStore.togglePreview(false)"
				:delete-item="handleDelete"
			/>
			<div v-if="!mainStore.previewStatus" class="md:block hidden"></div>
		</div>
		<ButtomNav :should-hide="shouldHideButtomNav" />
		<MobileFilePreview
			:is-open="mainStore.previewStatus"
			:preview-file="mainStore.previewFileInformation"
			:close-preview="() => mainStore.togglePreview(false)"
			:delete-item="handleDelete"
		/>
		<UploadPreview
			:total="uploadMeta.total"
			:uploaded="uploadMeta.completed"
			:displayStatus="uploadMeta.status"
			:percent-uploaded="uploadMeta.percent"
			:uploading-files-list="uploadMeta.uploadDetails"
			@close="handleClose"
		/>
	</div>
</template>

<script lang="ts" setup>
import { Ref, ref } from "vue";
import { StarIcon, PlusCircleIcon, SearchIcon, RssIcon } from "@heroicons/vue/outline";
import "./App.css";
import { SideNav, ButtomNav } from "./layouts/Nav";
import { FilePreview, MobileFilePreview } from "./layouts/FilePreview";
import ViewSwitcher from "./components/ViewSwitcher/ViewSwitcher.vue";
import AllFilesMenu from "./layouts/AllFilesMenu/AllFilesMenu.vue";
import { debounce, removeFile, throttle, uploadFiles } from "./utils";
import { useMainStore } from "./store";
import { DisplayFile } from "./types";
import UploadPreview from "./components/UploadPreview/UploadPreview.vue";
import { UploadFilesProgressDetails } from "./types";
import UploadProgressBadge from "./components/UploadPreview/UploadProgressBadge.vue";
import FileTypeFilter from "./components/FileFilters/FileTypeFilter.vue";

const mainStore = useMainStore();
const initialScrollPosition: Ref<number> = ref(0);
const shouldHideButtomNav: Ref<boolean> = ref(false);
const scrollDirection: Function = throttle((event: Event) => {
	if (!event.target) return;
	const initialPos = initialScrollPosition.value;
	const target = event.target as Element;
	console.log("initial sc pos ", initialPos, target.scrollTop);

	const movementDifference = initialPos - target.scrollTop;
	shouldHideButtomNav.value = movementDifference !== Math.abs(movementDifference);
	initialScrollPosition.value = target.scrollTop;
}, 100);
const uploadPercentage = ref<number | null>(null);

const uploadMeta = ref<{
	total: number;
	completed: number;
	percent: number;
	status: "OPEN" | "DONE" | "CLOSE";
	uploadDetails: UploadFilesProgressDetails["uploadingFilesDetails"];
}>({
	completed: 0,
	total: 0,
	percent: 0,
	status: "CLOSE",
	uploadDetails: [],
});

mainStore.fetchAllFiles().then((loadedFiles: DisplayFile[]) => {
	mainStore.setFilesOnDisplay(loadedFiles);
});

function handleClose() {
	console.log("closing...");

	uploadMeta.value.status = "CLOSE";
	uploadMeta.value.completed = 0;
	uploadMeta.value.percent = 0;
	uploadMeta.value.total = 0;
}

async function handleUpload(event: Event) {
	const evtTarget = event.target as HTMLInputElement;
	if (!evtTarget.files) return;
	if (evtTarget.files.length < 0) return;

	try {
		uploadMeta.value.status = "OPEN";
		await uploadFiles(evtTarget.files, updateProgress);
		await mainStore.fetchAllFiles();
		mainStore.applyFilters();
	} catch (err: any) {
		console.log("An error occured while uploading file");
	} finally {
		uploadMeta.value.status = "DONE";
	}
}

function updateProgress(uploadDetails: UploadFilesProgressDetails) {
	if (uploadDetails.percentCompleted === null) mainStore.fetchAllFiles();
	if (uploadDetails.percentCompleted !== null) uploadMeta.value.percent = uploadDetails.percentCompleted;

	uploadPercentage.value = uploadDetails.percentCompleted;
	uploadMeta.value.completed = uploadDetails.completedUploads;
	uploadMeta.value.total = uploadDetails.totalUploads;
	uploadMeta.value.uploadDetails = uploadDetails.uploadingFilesDetails;
}

const debounceSearchHanler = debounce((filename: string) => {
	mainStore.setFileFilters("search", filename);
	mainStore.applyFilters();
}, 10);

function handleFileSearch(event: Event) {
	event.preventDefault();

	const eventTarget = event.target as HTMLInputElement;
	const filenameSearchString: string = eventTarget.value;

	debounceSearchHanler(filenameSearchString);
}

function handleFileTypeFilter(selectedFileTypes: Array<string>) {
	mainStore.setFileFilters("fileTypes", selectedFileTypes);
	mainStore.applyFilters();
}

async function handleDelete(fileId: string, file: DisplayFile) {
	await removeFile(fileId);
	mainStore.removeFileOnDisplay(fileId);
	await mainStore.fetchAllFiles();
}
</script>

<style scoped>
.outer::after {
	content: "";
	box-shadow: inset 0px 20px 8px -10px #f5f9fdc7, inset 0px -20px 8px -10px #f5f9fdc7;

	height: 100%;
	position: absolute;
	width: 100%;
	left: 0px;
	top: 0px;
	pointer-events: none;
}
</style>
