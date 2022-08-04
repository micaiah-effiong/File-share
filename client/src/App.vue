<template>
	<div class="flex flex-col h-screen w-full justify-between">
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
							<input type="file" multiple hidden id="uploadField" @change="handleUpload" />
							<label for="uploadField" class="cursor-pointer">
								<button class="pointer-events-none justify-center items-center flex h-5 w-5">
									<UploadPreview
										:class="'bg-none drop-shadow-none'"
										v-if="uploadMeta.status === 'OPEN'"
										:size="'SM'"
										:total="uploadMeta.total"
										:uploaded="uploadMeta.completed"
										:displayStatus="uploadMeta.status"
										:percent-uploaded="uploadMeta.percent"
										@close="handleClose"
									/>
									<PlusCircleIcon class="w-5" v-else="(uploadMeta.status = 'CLOSE')" />
								</button>
							</label>
							<label for="searchField">
								<button>
									<SearchIcon class="w-5" />
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
						<div class="cut"></div>
					</div>

					<!-- <nav class=""> -->
					<nav class="hidden md:block py-2 md:py-0">
						<div class="flex justify-between text-ocean-blue-dark">
							<div class="flex gap-2 md:gap-6 flex-1">
								<div class="flex gap-2 shadow-md p-2 rounded-lg bg-white">
									<FolderIcon class="w-5 text-ocean-blue-normal" />
									<ChevronDownIcon class="w-3" />
								</div>

								<button class="hidden align-middle md:block">Recent Files</button>
							</div>

							<div class="flex items-center">
								<ViewSwitcher :file-view-type="mainStore.fileViewType" />
							</div>
						</div>
					</nav>
				</header>
				<main class="max-h-[calc(100%-109px)] md:max-h-[calc(100%-105px)">
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
		<UploadPreview
			:size="'MD'"
			:total="uploadMeta.total"
			:uploaded="uploadMeta.completed"
			:displayStatus="uploadMeta.status"
			:percent-uploaded="uploadMeta.percent"
			@close="handleClose"
		/>
	</div>
</template>

<script lang="ts" setup>
import { Ref, ref } from "vue";
import { StarIcon, PlusCircleIcon, SearchIcon, ChevronDownIcon, RssIcon } from "@heroicons/vue/outline";
import { FolderIcon } from "@heroicons/vue/solid";
import "./App.css";
import { SideNav, ButtomNav } from "./layouts/Nav";
import FilePreview from "./layouts/FilePreview/FilePreview.vue";
import ViewSwitcher from "./components/ViewSwitcher/ViewSwitcher.vue";
import AllFilesMenu from "./layouts/AllFilesMenu/AllFilesMenu.vue";
import { debounce, removeFile, throttle, uploadFiles } from "./utils";
import { useMainStore } from "./store";
import { DisplayFile } from "./types";
import UploadPreview from "./components/UploadPreview/UploadPreview.vue";

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
}>({
	completed: 0,
	total: 0,
	percent: 0,
	status: "CLOSE",
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
	} catch (err: any) {
		console.log("An error occured while uploading file");
	} finally {
		uploadMeta.value.status = "DONE";
	}
}

function updateProgress(percent: number | null, completed: number, total: number) {
	if (percent === null) mainStore.fetchAllFiles();
	if (percent !== null) uploadMeta.value.percent = percent;

	uploadPercentage.value = percent;
	uploadMeta.value.completed = completed;
	uploadMeta.value.total = total;
}

const debounceSearchHanler = debounce((filename: string) => {
	const matchedFiles = mainStore.searchFile(filename);
	mainStore.setFilesOnDisplay(matchedFiles);
}, 10);

function handleFileSearch(event: Event) {
	event.preventDefault();
	const eventTarget = event.target as HTMLInputElement;
	const filename: string = eventTarget.value;
	debounceSearchHanler(filename);
}

async function handleDelete(fileId: string, file: DisplayFile) {
	await removeFile(fileId);
	await mainStore.fetchAllFiles();
	const files = new Set(mainStore.filesOnDisplay);
	files.delete(file);

	const filesArr = Array.from(files);
	mainStore.setFilesOnDisplay(filesArr);
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
