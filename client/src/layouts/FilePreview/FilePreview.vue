<template>
	<aside
		class="h-full max-w-5/12 w-5/12 lg:w-3/12 md:w-4/12 shrink-0 py-7 bg-white hidden md:block shadow-md shadow-ocean-blue-accent"
		v-if="isOpen"
	>
		<div class="flex flex-col h-full">
			<header class="px-3">
				<div class="flex justify-between text-ocean-blue-dark">
					<div class="flex gap-2">
						<DocumentTextIcon class="w-5" />
						<span>File Preview</span>
					</div>
					<button class="w-5" @click="closePreview">
						<XIcon />
					</button>
				</div>
				<div class="py-5">
					<div class="cut"></div>
				</div>
			</header>
			<main class="h-full grid overflow-auto" v-if="previewFile">
				<main class="px-9 text-sm text-ocean-blue-dark w-full">
					<div class="grid gap-7">
						<div class="grid gap-3">
							<div class="flex justify-center">
								<DocumentIcon class="h-48 text-ocean-blue-secondary" />
							</div>
							<div class="grid gap-2">
								<div class="font-semibold break-all">
									{{ previewFile.filename }}
								</div>
								<div class="text-xs">
									{{ previewFile.size }}
								</div>
							</div>
						</div>
						<div class="cut"></div>
						<div class="break-words grid gap-2">
							<div class="font-semibold">Description</div>
							<div class="text-xs leading-5">
								Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis tempus suscipit dolor tincidunt gravida.
								Praesent ac rutrum massa. Cras vestibulum magna a tortor varius, nec interdum dui dapibus.
							</div>
						</div>
						<div class="cut"></div>
						<div class="grid gap-2">
							<div class="font-semibold">Shared with:</div>
							<div class="grid gap-1">
								<div class="flex gap-3">
									<AvatarVue label="Olive Silver" />
									<div>Olive Silver</div>
								</div>
								<div class="flex gap-3">
									<AvatarVue label="Tom Shedy" />
									<div>Tom Shedy</div>
								</div>
							</div>
						</div>
					</div>
				</main>
				<div class="border-t self-end mt-7 py-5 px-9">
					<div class="flex justify-between text-xs text-ocean-blue-dark gap-3">
						<ActionBtn label="Share">
							<ExternalLinkIcon />
						</ActionBtn>
						<ActionBtn label="Save">
							<a :href="previewFile.downloadLink">
								<DownloadIcon />
							</a>
						</ActionBtn>
						<ActionBtn label="Edit">
							<PencilIcon />
						</ActionBtn>
						<ActionBtn label="Delete" :onclick="handleDelete" :is-disabled="deleteBtnDisabled">
							<TrashIcon />
						</ActionBtn>
					</div>
				</div>
			</main>
		</div>
	</aside>
</template>

<script lang="ts" setup>
import { DocumentIcon } from "@heroicons/vue/solid";
import { DocumentTextIcon, ExternalLinkIcon, PencilIcon, TrashIcon, XIcon, DownloadIcon } from "@heroicons/vue/outline";
import AvatarVue from "../../components/Avatar/Avatar.vue";
import ActionBtn from "../../components/Buttons/ActionBtn.vue";
import { ref, Ref } from "vue";
import { DisplayFile, Nullable } from "../../types";

const props = withDefaults(
	defineProps<{
		previewFile: Nullable<DisplayFile>;
		isOpen: boolean;
		closePreview: (payload: MouseEvent) => void;
		deleteItem: (fileId: string, file: DisplayFile) => void;
	}>(),
	{
		isOpen: false,
	}
);

const deleteBtnDisabled: Ref<boolean> = ref(false);

async function handleDelete() {
	if (!props.previewFile) return;

	try {
		deleteBtnDisabled.value = true;
		await props.deleteItem(props.previewFile.id, props.previewFile);
	} catch (error) {
		console.error("Failed to delete file", error);
	} finally {
		deleteBtnDisabled.value = false;
	}
}
</script>
