const socket = io({ path: "/p2p" });
const peer = new Peer({
  host: location.hostname,
  port: location.port,
  path: "/peer",
  // debug: 3,
});

socket.on("PEER::CONNECTION", (peerId) => {
  console.log(">peerId", peerId);
  const conn = peer.connect(peerId);
  conn.on("open", () => {
    let elt = document.createElement("li");
    elt.textContent = conn.peer;
    document.querySelector("ul").append(elt);

    conn.peerConnection.oniceconnectionstatechange = (e) => {
      console.log("onconnectionstatechange", conn.peer);
    };

    conn.send("Hi");
  });
});

socket.on("JOINED", (socId) => {
  console.log(">socId", socId);
});

peer.on("open", () => {
  socket.emit("PEER::CONNECTION", peer.id);
});

peer.on("connection", (inConn) => {
  console.log("on connection");
  let elt = document.createElement("li");
  elt.textContent = inConn.peer;
  document.querySelector("ul").append(elt);

  inConn.peerConnection.oniceconnectionstatechange = (e) => {
    console.log("onconnectionstatechange", inConn.peer);
  };

  inConn.on("data", (msg) => {
    console.log(new Blob([msg]), inConn);
    inConn.send("hello");
  });
});

const tooling = () => {
  let file = document.querySelector("#file");
  let buddy = document.querySelector("#toPeer");
  let conn = peer.connections[buddy.value][0];
  conn.send(file.files[0]);
};
