let { server } = require("./app");
let fs = require("fs");
let path = require("path");
let io = require("socket.io")(server);
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
    io.emit("fileUpdate");
    appFiles = [...dirChange];
  }
});

io.on("connection", function (client) {
  io.emit("joined", client.id);

  client.on("disconnect", function (id) {
    console.log("client disconnected", id); //log client disconnect
  });
});

module.exports = io;
