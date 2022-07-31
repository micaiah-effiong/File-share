import { HomeIcon, FolderIcon, VideoCameraIcon, PhotographIcon } from "@heroicons/vue/outline";
import { FunctionalComponent } from "vue";
export const navItems: Array<{ text: string; icon: FunctionalComponent }> = [
	{ text: "Home", icon: HomeIcon },
	{ text: "Recent", icon: FolderIcon },
	{ text: "Video", icon: VideoCameraIcon },
	{ text: "Photo", icon: PhotographIcon },
];
