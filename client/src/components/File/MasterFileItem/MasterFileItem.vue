<template>
  <GridFileItem
    v-if="viewType === FileViewTypes.GRID"
    :file="file"
    :is-selected="isSelected"
    :key="FileViewTypes.GRID"
    :class="selectedClass"
    @click="emit('click', file, file.filename)"
  />
  <ListFileItem
    v-if="viewType === FileViewTypes.LIST"
    :file="file"
    :is-selected="isSelected"
    :key="FileViewTypes.LIST"
    :class="selectedClass"
    @click="emit('click', file, file.filename)"
  />
  <SemiListFileItem
    v-if="viewType === FileViewTypes.SEMI_LIST"
    :file="file"
    :is-selected="isSelected"
    :key="FileViewTypes.SEMI_LIST"
    :class="selectedClass"
    @click="emit('click', file, file.filename)"
  />
</template>

<script lang="ts" setup>
import { computed, defineProps, useAttrs } from "vue";
import { DisplayFile } from "../../../types";
import { FileViewTypesList, FileViewTypes } from "../../../store/types";

import GridFileItem from "../GridFileItem/GridFileItem.vue";
import ListFileItem from "../ListFileItem/ListFileItem.vue";
import SemiListFileItem from "../SemiListFileItem/SemiListFileItem.vue";
const emit = defineEmits(["click"]);

const props = withDefaults(
  defineProps<{
    file: DisplayFile;
    isSelected?: boolean;
    viewType: FileViewTypesList;
  }>(),
  {
    isSelected: false,
  }
);
const selectedClass = computed(() =>
  props.isSelected ? "bg-blue-50" : "bg-white"
);
</script>
