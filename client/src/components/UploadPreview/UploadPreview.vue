<template>
	<div
		v-bind="$attrs"
		v-if="size === 'MD' && (displayStatus === 'OPEN' || displayStatus === 'DONE')"
		class="drop-shadow-md drop-shadow-ocean-blue-dark shadow-md shadow-ocean-blue-accent absolute bottom-0 right-5 lg:w-3/12 md:grid md:w-5/12 hidden rounded-sm h-auto bg-ocean-blue-light"
	>
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
		<div :class="showDetails ? 'grid' : 'hidden'">
			<div
				v-for="uploadingFile in uploadingFilesList"
				class="p-2 text-sm flex gap-2 border-b border-ocean-blue-secondary"
			>
				<div class="truncate ...">{{ uploadingFile.filename }}</div>
				<div class="ml-auto text-xs shrink-0 w-16">
					{{ uploadingFile.progress < 100 ? `${uploadingFile.progress}%` : "Complete" }}
				</div>
			</div>
		</div>
	</div>

	<button
		v-if="size === 'SM'"
		@click="emit('close')"
		class="text-ocean-blue-dark drop-shadow-md drop-shadow-ocean-blue-dark"
		v-bind="$attrs"
	>
		<CircleProgressVue :percent="percentUploaded" />
	</button>
</template>

<script lang="ts" setup>
import { XIcon, ChevronDownIcon } from "@heroicons/vue/outline";
import { ref, toRef, watch } from "vue";
import CircleProgressVue from "./CircleProgress.vue";

const emit = defineEmits<{ (event: "close"): void }>();
const props = withDefaults(
	defineProps<{
		uploaded: number;
		total: number;
		percentUploaded: number;
		size: "SM" | "MD";
		displayStatus?: "OPEN" | "DONE" | "CLOSE";
		uploadingFilesList: Array<{ filename: string; progress: number }>;
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

watch(toRef(props, "displayStatus"), () => {
	if (props.displayStatus !== "OPEN" && props.size === "SM") {
		emit("close");
	}
});
</script>
