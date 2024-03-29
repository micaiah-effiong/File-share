#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { app, server } from "../app";
import debug from "debug"; //("file-share:server");
// import http from "http";
// import { exec } from "child_process";
import { DB } from "../models";
import QRcode from "qrcode";
import path from "path";
import { promises as fsPromise } from "fs";
import getMyIPAddress from "../handlers/local-ip";
import config from "../config/env";
import { Logger } from "../handlers";

const fileShareDebugger: debug.Debugger = debug("file-share:server");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(config.PORT);
app.set("port", port);

/**
 * Create a files directory if not exist
 */
let filesPath: string = config.FILE_STORAGE_PATH || path.resolve(process.cwd(), "src", "files");

async function createStoreDir(dirPath: string): Promise<string | undefined> {
	return await fsPromise.mkdir(dirPath, { recursive: true });
}

/**
 * Listen on provided port, on all network interfaces.
 */
createStoreDir(filesPath).then(async () => {
	await DB.sync({ force: false });
	server.listen(port, async () => {
		Logger.info("Server has started");
		Logger.info(`> \tlocalhost:${port}`);

		const ips: string[] = await getMyIPAddress();
		ips.forEach(async (ipAddress: string, _: number, arr: string[]) => {
			const localhost: string = "127.0.0.1";
			if (ipAddress === localhost && config.ORIGIN) return;
			if (ipAddress === localhost && !config.ORIGIN && arr.length > 1) return;
			config.ORIGIN = config.ORIGIN || `http://${ipAddress || localhost}:${port}`;

			Logger.info(`> \t${config.ORIGIN}`);
			const start = process.platform == "darwin" ? "open" : process.platform == "win32" ? "start" : "xdg-open";

			const command: string = `${start} ${config.ORIGIN}`;

			// generate qrcode
			if (process.env.NODE_ENV === "production") {
				const dUrl: string = await QRcode.toDataURL(config.ORIGIN);
				// exec(`${start} ${dUrl}`);
				// open an html page with the QRcode
			} else {
				const dUrl: string = await QRcode.toString(config.ORIGIN, {
					type: "terminal",
				});
			}
		});
	});
	server.on("error", onError);
	server.on("listening", onListening);
});

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val: number) {
	if (val >= 0) {
		return val;
	}
	return false;
}

interface SystemError extends Error {
	address: string; // If present, the address to which a network connection failed
	code: string; // The string error code
	dest: string; // If present, the file path destination when reporting a file system error
	errno: number; // The system-provided error number
	info: Object; // If present, extra details about the error condition
	message: string; // A system-provided human-readable description of the error
	path: string; // If present, the file path when reporting a file system error
	port: number; //If present, the network connection port that is not available
	syscall: string; // The name of the system call that triggered the error
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: SystemError) {
	if (error.syscall !== "listen") {
		throw error;
	}

	const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case "EACCES":
			Logger.error(bind + " requires elevated privileges");
			process.exit(1);
			break;
		case "EADDRINUSE":
			Logger.error(bind + " is already in use");
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
	const addr = server.address();
	const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
	fileShareDebugger("Listening on " + bind);
}
