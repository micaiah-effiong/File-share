let { server } = require("./app");
let fs = require("fs");
let path = require("path");
let io = require("socket.io")(server);
const peerIO = require("socket.io")(server, { path: "/p2p" });
const { listFiles: fileList } = require("./handlers/index");

let appFiles = [];

fs.watch(path.resolve(__dirname, "files"), async (err, data) => {
  let dirChange = await fileList();
  if (
    !!(
      dirChange.map((e) => e.filename).join() !==
      appFiles.map((e) => e.filename).join()
    )
  ) {
    io.emit("FILE_UPDATE");
    appFiles = [...dirChange];
  }
});

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
