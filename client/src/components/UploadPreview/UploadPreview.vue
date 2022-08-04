<template>
	<div
		v-bind="$attrs"
		v-if="size === 'MD' && (displayStatus === 'OPEN' || displayStatus === 'DONE')"
		class="text-ocean-blue-dark bg-white drop-shadow-md drop-shadow-ocean-blue-dark absolute bottom-7 right-5 lg:w-3/12 md:block md:w-4/12 hidden p-2 rounded-sm"
	>
		<div class="grid">
			<div class="flex justify-between">
				<div class="flex justify-between items-center w-full">
					<div v-if="percentUploaded < 100">Uploading {{ uploaded }} of {{ total }}</div>
					<div v-if="percentUploaded === 100">Uploading complete</div>
					<div class="relative">
						<CircleProgressVue :percent="percentUploaded" />
					</div>
				</div>
				<button class="right-2 top-2" @click="emit('close')"><XIcon class="w-4" /></button>
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
import { XIcon } from "@heroicons/vue/outline";
import { toRef, watch } from "vue";
import CircleProgressVue from "./CircleProgress.vue";

const emit = defineEmits<{ (event: "close"): void }>();
const props = withDefaults(
	defineProps<{
		uploaded: number;
		total: number;
		percentUploaded: number;
		size: "SM" | "MD";
		displayStatus?: "OPEN" | "DONE" | "CLOSE";
	}>(),
	{
		total: 0,
		uploaded: 0,
		percentUploaded: 0,
		displayStatus: "CLOSE",
	}
);

watch(toRef(props, "displayStatus"), () => {
	if (props.displayStatus !== "OPEN" && props.size === "SM") {
		emit("close");
	}
});
</script>
