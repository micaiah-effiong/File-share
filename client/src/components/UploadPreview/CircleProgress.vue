<template>
	<svg class="progress-ring" :height="radius * 2" :width="radius * 2">
		<circle
			ref="circle"
			class="progress-ring__circle"
			:stroke-width="stroke"
			:stroke="color"
			fill="transparent"
			:r="normalizedRadius"
			:cx="radius"
			:cy="radius"
			:style="{ strokeDashoffset }"
			:stroke-dasharray="`${circumference} ${circumference}`"
		/>
		<text class="progress-ring__text" text-anchor="middle" x="50%" y="58%" :font-size="radius / 2" :fill="color">
			{{ percent }}
		</text>
	</svg>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";

const props = withDefaults(defineProps<{ radius?: number; stroke?: number; percent?: number; color?: string }>(), {
	radius: 15,
	percent: 0,
	stroke: 2,
	color: "#078dee",
});
const circle = ref<SVGAElement | null>(null);

const normalizedRadius = ref(props.radius - props.stroke * 2);
const circumference = ref(normalizedRadius.value * 2 * Math.PI);
const strokeDashoffset = computed(() => circumference.value - (props.percent / 100) * circumference.value);
</script>

<style scoped>
.progress-ring__circle {
	transition: stroke-dashoffset 0.35s;
	transform: rotate(-90deg);
	transform-origin: 50% 50%;
}

.progress-ring__text {
}
</style>
