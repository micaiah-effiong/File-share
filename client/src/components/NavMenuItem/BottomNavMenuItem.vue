<template>
	<button
		class="grid justify-center justify-items-center items-center text-ocean-blue-dark text-center"
		:class="text === activeTab && 'active'"
	>
		<div class="nav-item px-3">
			<div class="w-6">
				<slot name="icon"></slot>
			</div>
		</div>

		<span class="text-xs uppercase" v-if="text && showText">{{ text }}</span>
	</button>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
defineProps<{ text: string; activeTab: string; showText: boolean }>();
</script>

<style>
.active {
	/*box-shadow: 0px 2px theme("colors.ocean-blue.normal");*/
	transition-property: box-shadow;
	transition-duration: 0.3s;
	transition-timing-function: ease-in-out;
}

.active > span,
.active > div {
	color: theme("colors.ocean-blue.normal");
	transition-property: color;
	transition-duration: 0.3s;
}
</style>
