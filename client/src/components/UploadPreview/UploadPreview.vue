<template>
	<div
		v-if="displayStatus !== 'CLOSE'"
		class="drop-shadow-md drop-shadow-ocean-blue-dark shadow-md shadow-ocean-blue-accent absolute bottom-0 right-5 lg:w-3/12 md:flex hidden h-auto md:w-5/12 w-5/12 rounded-sm bg-ocean-blue-light"
	>
		<div class="relative w-full">
			<div class="grid text-ocean-blue-light bg-ocean-blue-mid-night p-2">
				<div class="flex justify-between gap-2">
					<div class="flex justify-between items-center w-full">
						<div v-if="percentUploaded < 100">Uploading {{ uploaded }} of {{ total }}</div>

						<div v-if="percentUploaded === 100">Uploading complete</div>

						<div class="relative">
							<CircleProgressVue :percent="percentUploaded" />
						</div>
					</div>
					<div class="flex gap-2">
						<button class="relative ml-auto" @click="showDetails = !showDetails">
							<ChevronDownIcon class="w-3" />
						</button>
						<button class="right-2 top-2" @click="emit('close')"><XIcon class="w-4" /></button>
					</div>
				</div>
			</div>
			<div :class="showDetails ? 'flex flex-col' : 'hidden'">
				<UploadFileItem
					v-for="uploadingFile in uploadingFilesList"
					:key="uploadingFile.filename"
					:abortController="uploadingFile.abortController"
					:filename="uploadingFile.filename"
					:progress="uploadingFile.progress"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { XIcon, ChevronDownIcon } from "@heroicons/vue/outline";
import { ref, watch } from "vue";
import { UploadFilesProgressDetails } from "../../types";
import CircleProgressVue from "./CircleProgress.vue";
import UploadFileItem from "./UploadFileItem.vue";

const TIME_TO_CLOSE_PREVIEW = 10000;
const emit = defineEmits<{ (event: "close"): void }>();
const props = withDefaults(
	defineProps<{
		uploaded: number;
		total: number;
		percentUploaded: number;
		displayStatus?: "OPEN" | "DONE" | "CLOSE";
		uploadingFilesList: UploadFilesProgressDetails["uploadingFilesDetails"];
	}>(),
	{
		total: 0,
		uploaded: 0,
		percentUploaded: 0,
		displayStatus: "CLOSE",
		uploadingFilesList: () => [],
	}
);
const showDetails = ref(true);

watch(
	() => props.displayStatus,
	(update) => {
		if (update === "DONE") {
			setTimeout(() => {
				if (props.displayStatus === "DONE") {
					emit("close");
				}

				console.log("gone");
			}, TIME_TO_CLOSE_PREVIEW);
		}
	}
);
</script>
