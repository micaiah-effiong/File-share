import { io, Socket } from "socket.io-client";

class SocketClient {
	socket: Socket;

	constructor(url: string) {
		this.socket = io(url, { autoConnect: false });
	}

	initSocket(cb?: Function) {
		this.socket.connect();

		if (cb) {
			cb(this.socket);
		}
	}
}

const URL: string = import.meta.env.VITE_EXTERNAL_API;
export const socketClient = new SocketClient(URL);
