<template>
	<div class="grid gap-3 justify-items-center">
		<button
			role="button"
			class="w-6 text-white bg-ocean-blue-normal disabled:bg-ocean-blue-dark rounded-md p-1"
			:disabled="isDisabled"
		>
			<slot></slot>
		</button>
		<div>{{ label }}</div>
	</div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
withDefaults(defineProps<{ label: string; isDisabled?: boolean }>(), {
	isDisabled: false,
});
</script>
