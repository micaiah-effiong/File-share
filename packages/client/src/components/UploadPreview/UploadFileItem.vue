<template>
	<div class="p-2 text-sm flex justify-between gap-2 border-b border-ocean-blue-secondary w-full">
		<div class="truncate ... max-w-[60%]">{{ filename }}</div>
		<div class="shrink-0 min-w-16 flex justify-between">
			<div class="text-xs">
				{{ showPercent ? `${progress}%` : status }}
			</div>
			<div v-if="showPercent">
				<button @click="handleAbort"><XIcon class="w-4" /></button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { XIcon } from "@heroicons/vue/outline";
import { computed, ref, watch } from "vue";

enum UploadStatus {
	IN_PROGRESS = "IN_PROGRESS",
	COMPLETED = "COMPLETED",
	CANCELLED = "CANCELLED",
}

const MAX_PROGRESS = 100;

const props = defineProps<{ filename: string; progress: number; abortController: AbortController }>();

const initialStatus: Exclude<UploadStatus, UploadStatus.CANCELLED> =
	props.progress < MAX_PROGRESS ? UploadStatus.IN_PROGRESS : UploadStatus.COMPLETED;
const status = ref<`${UploadStatus}`>(initialStatus);

const showPercent = computed(() => {
	return props.progress < MAX_PROGRESS && status.value === UploadStatus.IN_PROGRESS;
});

watch(
	() => props.progress,
	() => {
		if (status.value === UploadStatus.CANCELLED) return;

		if (props.progress === MAX_PROGRESS) {
			status.value = UploadStatus.COMPLETED;
		} else if (props.progress < MAX_PROGRESS) {
			status.value = UploadStatus.IN_PROGRESS;
		}
	}
);

function handleAbort() {
	props.abortController.abort("CANCEL upload");
	status.value = UploadStatus.CANCELLED;
	console.log(props.abortController.signal);
}
</script>
