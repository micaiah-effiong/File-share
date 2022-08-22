<template>
	<button
		:class="isOpen ? 'rounded-t-md' : 'rounded-md'"
		class="flex flex-col gap-4 shadow-md p-2 bg-white relative divide-y focus:border-0 min-w-28 w-28"
		@focus="handleFocus"
		@focusout="handleNoFocus"
	>
		<div class="flex gap-3 pointer-events-none">
			<div class="flex">
				<FolderIcon class="w-5 text-ocean-blue-normal" />
				<ChevronDownIcon class="w-3" />
			</div>
			<span class="hidden align-middle md:block text-sm">{{ titleDisplay }}</span>
		</div>
		<div
			:class="!isOpen && 'hidden'"
			class="absolute w-full min-w-fit left-0 top-9 shadow-md rounded-b-lg bg-white text-sm"
		>
			<ul class="w-full flex flex-col max-h-40 overflow-auto divide-y">
				<li v-for="item in availableFileTypes">
					<input
						type="checkbox"
						hidden
						name="fileType"
						@change="(e) => handleSelect(e, item)"
						:id="item"
						class="peer"
					/>
					<label
						class="flex gap-2 text items-center py-2 hover:bg-ocean-blue-light p-2 w-full peer-checked:bg-ocean-blue-accent"
						:for="item"
					>
						<div>
							<FolderIcon class="w-4 text-ocean-blue-normal" />
						</div>
						<div>{{ item }}</div>
					</label>
				</li>
			</ul>
		</div>
	</button>
</template>

<script lang="ts" setup>
import { FolderIcon } from "@heroicons/vue/solid";
import { ChevronDownIcon } from "@heroicons/vue/outline";
import { computed, Ref, ref } from "vue";
enum AvailableFileTypes {
	IMAGE = "Image",
	AUDIO = "Audio",
	VIDEO = "Video",
}
const availableFileTypes = Object.values(AvailableFileTypes);

const emit = defineEmits<{
	(event: "fileFilterChange", fileTypes: Array<string>): void;
}>();
const isOpen: Ref<boolean> = ref(false);
const selectedFileTypes: Ref<Set<string>> = ref(new Set([]));
const titleDisplay = computed(() => {
	const selected = selectedFileTypes.value;

	if (selected.size === 0) {
		return "All files";
	} else if (selected.size > 1) {
		return `${selected.size} Types`;
	} else {
		return Array.from(selected).join();
	}
});

function handleFocus() {
	isOpen.value = true;
}

function handleNoFocus() {
	isOpen.value = false;
	const lowerSelectedTypes = Array.from(selectedFileTypes.value).map((type) => type.toLowerCase());
	emit("fileFilterChange", lowerSelectedTypes);
}

function handleSelect(event: Event, name: string) {
	const target = event.target as HTMLInputElement;

	if (target.checked) {
		selectedFileTypes.value.add(name);
	} else {
		selectedFileTypes.value.delete(name);
	}
}
</script>
