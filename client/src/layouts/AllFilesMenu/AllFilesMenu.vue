<template>
  <div
    class="grid gap-2 h-full py-3 overflow-auto px-1"
    v-if="mainStore.fileViewType === FileViewTypes.LIST"
    @scroll="scrollHandler"
  >
    <ListFileItem
      v-for="file in files"
      :file="file"
      :key="file.filename"
      :isSelected="selectedFileName === file.filename"
      @click="() => handleClick(file, file.filename)"
    />
  </div>
  <div
    class="
      h-full
      grid
      gap-2
      grid-cols-2
      md:grid-cols-3
      xl:grid-cols-4
      2xl:grid-cols-6
      py-3
      overflow-auto
      px-1
    "
    v-bind="$attrs"
    v-if="mainStore.fileViewType === FileViewTypes.GRID"
    @scroll="scrollHandler"
  >
    <GridFileItem
      v-for="file in props.files"
      :file="file"
      :key="file.filename"
      :isSelected="selectedFileName === file.filename"
      @click="() => handleClick(file, file.filename)"
    />
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useMainStore } from "../../store";
import { DisplayFile } from "../../types";
import { FileViewTypes } from "../../store/types";
import GridFileItem from "../../components/File/GridFileItem/GridFileItem.vue";
import ListFileItem from "../../components/File/ListFileItem/ListFileItem.vue";

const props = defineProps<{ files: DisplayFile[]; handleScroll: Function }>();
const mainStore = useMainStore();
const selectedFileName = ref<string | null>("");

function handleClick(file: DisplayFile, fileName: string) {
  console.log("CALLED", { file, state: mainStore.previewStatus });
  if (selectedFileName.value === fileName) {
    selectedFileName.value = null;
    return;
  }
  mainStore.togglePreview(true);
  mainStore.updatePreviewFile(file);
  selectedFileName.value = fileName;
}

function scrollHandler(event: Event) {
  props.handleScroll(event);
}
</script>
