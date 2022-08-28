import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_EXTERNAL_API);

export const main = () => console.log("socket-id", import.meta.env.VITE_EXTERNAL_API);

socket.on("connect", () => {
	console.log("connected");
});

socket.on("JOINED", (id) => {
	console.log("joined", id, socket.id);
});

console.log("socket-id out", import.meta.env.VITE_EXTERNAL_API);
