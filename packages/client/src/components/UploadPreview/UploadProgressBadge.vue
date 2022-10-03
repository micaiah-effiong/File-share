<template>
	<button
		v-if="displayStatus === 'OPEN'"
		@click="emit('close')"
		class="text-ocean-blue-dark drop-shadow-md drop-shadow-ocean-blue-dark"
		v-bind="$attrs"
	>
		<CircleProgressVue :percent="percentUploaded" />
	</button>
</template>

<script lang="ts" setup>
import CircleProgressVue from "./CircleProgress.vue";
withDefaults(
	defineProps<{
		displayStatus?: "OPEN" | "DONE" | "CLOSE";
		percentUploaded: number;
	}>(),
	{ percentUploaded: 0, displayStatus: "CLOSE" }
);
const emit = defineEmits<{ (event: "close"): void }>();
</script>
