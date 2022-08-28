import http from "http";
import { Server } from "socket.io";

export const initIOServer = (httpServer: http.Server) => {
	const io: Server = new Server(httpServer, {
		cors: {},
	});

	io.on("connection", function (socket) {
		socket.emit("JOINED", socket.id);
		console.log("client connected", socket.id); //log client connect

		socket.on("disconnect", function (id) {
			console.log("client disconnected", id); //log client disconnect
		});
	});

	return io;

	// peerIO.on("connection", function (socket) {
	// 	socket.broadcast.emit("JOINED", socket.id);
	// 	console.log("P client connected", socket.id); //log client connect

	// 	socket.on("PEER::CONNECTION", (peerId) => {
	// 		console.log("P peer connected", peerId); //log client connect
	// 		peerIO.emit("PEER::CONNECTION", peerId);
	// 	});

	// 	socket.on("disconnect", function (id) {
	// 		console.log("P client disconnected", id); //log client disconnect
	// 	});
	// });
};
