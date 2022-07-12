<template>
  <div class="grid gap-2 h-full py-3 overflow-auto" v-if="store.state.fileViewType === FileViewType.LIST"
    @scroll="scrollHandler">
    <ListFileItem v-for="file in files" :file="file" :key="file.filename"
      :isSelected="selectedFileName === file.filename" @click="() => handleClick(file, file.filename)" />
  </div>
  <div class="
    h-full
    grid gap-2
    grid-cols-2
    md:grid-cols-3
    xl:grid-cols-4
    2xl:grid-cols-6
    py-3
    overflow-auto
  " v-bind="$attrs" v-if="store.state.fileViewType === FileViewType.GRID" @scroll="scrollHandler">
    <GridFileItem v-for="file in props.files" :file="file" :key="file.filename"
      :isSelected="selectedFileName === file.filename" @click="() => handleClick(file, file.filename)" />

  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue"
import { useStore } from "vuex"
import { DisplayFile } from "../../types";
import { FileViewType } from "../../store/types"
import GridFileItem from "../../components/File/GridFileItem/GridFileItem.vue";
import ListFileItem from "../../components/File/ListFileItem/ListFileItem.vue";


const props = defineProps<{ files: DisplayFile[], handleScroll: Function }>()
const store = useStore()
const selectedFileName = ref<string | null>("")

function handleClick(file: DisplayFile, fileName: string) {
  console.log("CALLED", { file, state: store.state.previewStatus });
  if (selectedFileName.value === fileName) {
    selectedFileName.value = null;
    return
  }
  store.commit("TOGGLE_PREVIEW", true)
  store.commit("UPDATE_PREVIEW_FILE", file)
  selectedFileName.value = fileName;
}

function scrollHandler(event: Event) {
  props.handleScroll(event)
}
</script>