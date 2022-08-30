import http from "http";
import { Server } from "socket.io";
import { socketServerEventListenOn } from "./config/socket-server";

export const initIOServer = (httpServer: http.Server) => {
	const io: Server = new Server(httpServer, {
		cors: {},
	});

	io.on("connection", function (socket) {
		socket.emit("JOINED", socket.id);
		console.log("client connected", socket.id);

		socket.on("disconnect", function (id) {
			console.log("client disconnected", id);
		});

		socketServerEventListenOn("FILE::CREATED", () => {
			socket.emit("FILE::CREATED");
		});

		socketServerEventListenOn("FILE::DELETED", (fileId: string) => {
			socket.emit("FILE::DELETED", fileId);
		});
	});

	return io;
};
