#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { app, server } from "../app";
import debug from "debug"; //("file-share:server");
import http from "http";
import path from "path";
import { promises as fsPromise } from "fs";
import getMyIPAddress from "../handlers/local-ip";

const fileShareDebugger: debug.Debugger = debug("file-share:server");

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(Number(process.env.PORT || "3000"));
app.set("port", port);

/**
 * Create a files directory if not exist
 */
let filesPath = path.resolve(process.cwd(), "dist", "files");

async function findOrCreateStoreDir(dirPath: string): Promise<void> {
  try {
    const descp = await fsPromise.open(dirPath, "r");
    await descp.close();
  } catch (err: any) {
    if (err.code === "ENOENT") {
      return await fsPromise.mkdir(dirPath);
    }
  }
}

/**
 * Listen on provided port, on all network interfaces.
 */
findOrCreateStoreDir(filesPath).then(() => {
  server.listen(port, async () => {
    const io = require("../io");

    console.log("Server has started");
    console.log(`> \tlocalhost:${port}`);
    const ips: string[] = await getMyIPAddress();
    ips.forEach((ipAddress) => {
      console.log(`> \t${ipAddress}:${port}`);
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
    // port number
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
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
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
