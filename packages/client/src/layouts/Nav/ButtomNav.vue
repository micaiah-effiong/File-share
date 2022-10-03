<template>
	<buttom-nav-template />
</template>

<script lang="ts" setup>
import { computed, h, ref } from "vue";
import BottomNavMenuItem from "../../components/NavMenuItem/BottomNavMenuItem.vue";
import { navItems } from "../../layouts/Nav/NavItemsList";

const props = defineProps<{ shouldHide: boolean }>();
let activeTabName = ref<string>("Home");
const showTabText = ref<boolean>(false);
const hideClassName = computed(() => (props.shouldHide ? "hide-below" : ""));

function ButtomNavTemplate() {
	return h(
		"div",
		{
			class: `h-16 md:hidden fixed w-full bottom-0 bottom-nav ${hideClassName.value}`,
		},
		[
			h("div", { class: "h-full w-full px-4 py-2 relative bg-white" }, [
				h(
					"div",
					{ class: "w-full h-full flex justify-evenly" },
					[...navItems].map((e) => {
						return h(
							BottomNavMenuItem,
							{
								text: e.text,
								activeTab: activeTabName.value,
								showText: showTabText.value,
								onClick: () => (activeTabName.value = e.text),
							},
							{ icon: e.icon }
						);
					})
				),
			]),
		]
	);
}
</script>

<style scoped>
.bottom-nav {
	transition: 0.3s bottom;
}

.hide-below {
	bottom: -4rem;
}
</style>
