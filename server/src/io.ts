import { server } from "./app";
import fs from "fs";
import path from "path";
import { Server as SocketServer, Socket } from "socket.io";
import { FileData } from "./types";

// import PeerIO from "socket.io"; //(server, { path: "/p2p" });
import { listFiles as fileList } from "./handlers";

const io: SocketServer = new SocketServer();
const peerIO: SocketServer = new SocketServer(server, { path: "/p2p" });

let appFiles: FileData[] = new Array();

fs.watch(
  path.resolve(__dirname, "files"),
  async (err: string, data: string | Buffer) => {
    if (err) return;
    console.log("data", data);
    let dirChange: FileData[] = await fileList();
    const appFilesObject: any = {};
    appFiles.forEach((e: FileData) => (appFilesObject[e.filename] = e));
    let isChanged =
      dirChange.map((e) => e.filename).join() !==
      appFiles.map((e) => e.filename).join();
    let newFile = dirChange.filter(
      (file) => !(file.filename in appFilesObject)
    )[0];
    console.log("newFile", newFile);

    if (isChanged && newFile) {
      io.emit("FILE_UPDATE", newFile);
      appFiles = [...dirChange];
    } else if (isChanged && !newFile) {
      io.emit("FILE_UPDATE");
      appFiles = [...dirChange];
    }
  }
);

io.on("connection", function (socket) {
  socket.emit("JOINED", socket.id);
  console.log("client connected", socket.id); //log client connect

  socket.on("disconnect", function (id) {
    console.log("client disconnected", id); //log client disconnect
  });
});

peerIO.on("connection", function (socket) {
  socket.broadcast.emit("JOINED", socket.id);
  console.log("P client connected", socket.id); //log client connect

  socket.on("PEER::CONNECTION", (peerId) => {
    console.log("P peer connected", peerId); //log client connect
    peerIO.emit("PEER::CONNECTION", peerId);
  });

  socket.on("disconnect", function (id) {
    console.log("P client disconnected", id); //log client disconnect
  });
});
module.exports = io;
