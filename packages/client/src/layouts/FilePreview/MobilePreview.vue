<template>
	<div v-if="isOpen && previewFile" class="md:hidden absolute z-10 h-full w-full bg-red-300">
		<div class="relative h-full w-full bg-ocean-blue-dark text-ocean-blue-dark flex flex-col">
			<div class="h-2/6 shrink-0 flex justify-center items-center" @click="closePreview">
				<DocumentIcon class="h-24 text-ocean-blue-secondary" />
			</div>
			<div class="bg-white mt-auto h-4/6 rounded-t-2xl pt-2">
				<div class="h-full p-3 gap-3 flex flex-col text-sm">
					<div class="h-full overflow-auto flex flex-col gap-3">
						<div>
							<div class="font-semibold">Description</div>

							<div>
								Lorem ipsum, dolor sit amet consectetur adipisicing elit. Saepe aliquam quisquam quos, pariatur ipsam
								libero, veniam quia voluptatem aspernatur recusandae, ad dignissimos non velit quae praesentium.
								Perspiciatis, culpa quas! Quasi?
							</div>
						</div>
						<div>
							{{ previewFile.filename }}
						</div>
						<div>
							{{ previewFile.size }}
						</div>
					</div>
					<div class="flex mt-auto text-xs text-ocean-blue-dark gap-3 justify-evenly">
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
			</div>
		</div>
	</div>
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
