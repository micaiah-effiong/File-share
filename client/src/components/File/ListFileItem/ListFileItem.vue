<template>
	<div
		class="w-full min-w-min max-h-fit h-fit rounded-lg shadow-sm mono:bg-ash-normal mono:text-ash-accent mono:hover:bg-ash-secondary mono:hover:transition-colors transition-colors"
	>
		<div class="flex w-full p-3 rounded-md">
			<div class="flex gap-3 w-full text-left">
				<div class="flex justify-center flex-col">
					<span>
						<DocumentIcon class="h-5 md:h-10 text-ocean-blue-secondary" />
					</span>
				</div>

				<div class="text-[0.8rem] md:w-2/6 w-4/6 text-left text-ocean-blue-dark flex justify-center flex-col">
					<span class="font-semibold">
						{{ file.short }}
					</span>
					<span class="">{{ file.size }}</span>
				</div>

				<div class="text-[0.8rem] hidden md:flex w-2/6 text-left text-ocean-blue-dark justify-center flex-col">
					<span class="">{{ new Date(file.createdAt).toDateString() }}</span>
					<span class="">{{ new Date(file.createdAt).toLocaleTimeString() }}</span>
				</div>

				<div class="hidden md:flex ml-auto">
					<div class="hidden md:flex h-full justify-center flex-col">
						<AvatarGroup :max="2">
							<Avatar label="Tim" />
							<Avatar label="Tim" url="https://randomuser.me/api/portraits/women/21.jpg" />
							<Avatar label="something" />
						</AvatarGroup>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { DocumentIcon } from "@heroicons/vue/solid";
import AvatarGroup from "../../Avatar/AvatarGroup.vue";
import Avatar from "../../Avatar/Avatar.vue";
import { DisplayFile } from "../../../types";

withDefaults(defineProps<{ file: DisplayFile; isSelected?: boolean }>(), {
	isSelected: false,
});
</script>
