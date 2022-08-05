<template>
	<div :class="renderClasses" @scroll="scrollHandler">
		<MasterFileItem
			v-for="file in props.files"
			:file="file"
			:key="file.id"
			:isSelected="selectedFileId === file.id"
			@click="() => handleClick(file, file.id)"
			:viewType="fileViewType"
		/>
	</div>
</template>
<script setup lang="ts">
import { computed, defineProps, ref } from "vue";
import { useMainStore } from "../../store";
import { DisplayFile } from "../../types";
import { FileViewTypes, FileViewTypesList } from "../../store/types";

import MasterFileItem from "../../components/File/MasterFileItem/MasterFileItem.vue";
const props = defineProps<{
	files: DisplayFile[];
	handleScroll: Function;
	fileViewType: FileViewTypesList;
}>();
const mainStore = useMainStore();
const selectedFileId = ref<string | null>("");

const renderClasses = computed(() => {
	switch (props.fileViewType) {
		case FileViewTypes.LIST:
			return "grid gap-2 h-full py-3 overflow-auto px-1";
		case FileViewTypes.SEMI_LIST:
			return "grid gap-2 grid-cols-2 lg:grid-cols-3 h-full py-3 overflow-auto px-1";
		case FileViewTypes.GRID:
			return " h-full grid gap-2 md:gap-3 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 py-3 overflow-auto px-1";
	}
});

function handleClick(file: DisplayFile, fileId: string) {
	console.log("CALLED", { file, state: mainStore.previewStatus });
	if (selectedFileId.value === fileId) {
		selectedFileId.value = null;
		mainStore.updatePreviewFile(null);
		return;
	}
	mainStore.togglePreview(true);
	mainStore.updatePreviewFile(file);
	selectedFileId.value = fileId;
}

function scrollHandler(event: Event) {
	props.handleScroll(event);
}
</script>
