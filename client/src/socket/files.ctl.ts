import { Socket } from "socket.io-client";
import { useMainStore } from "../store";

function create(socket: Socket) {
	socket.emit("FILE::CREATE");
}

function remove(socket: Socket) {
	socket.emit("FILE::DELETE");
}

function created(socket: Socket) {
	const mainStore = useMainStore();

	socket.on("FILE::CREATED", async () => {
		await mainStore.fetchAllFiles();
		mainStore.applyFilters();
	});
}

function removed(socket: Socket) {
	const mainStore = useMainStore();

	socket.on("FILE::DELETED", async (fileId: string) => {
		mainStore.removeFileOnDisplay(fileId);
		await mainStore.fetchAllFiles();
	});
}

export const registerFiles = {
	emit: { create, remove },
	listen: {
		created,
		removed,
	},
};
