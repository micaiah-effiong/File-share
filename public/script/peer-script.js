const socket = io(location.origin, { path: "/p2p" });
const peer = new Peer({
  host: location.hostname,
  port: location.port,
  path: "/peer/peer-wrtc",
  // debug: 4,
});

let vid_stream;
navigator.mediaDevices
  .getUserMedia({ video: true, audio: false })
  .then((stream) => {
    vid_stream = stream;
    const vid = setVideoElt();
    vid.srcObject = stream;
    vid.width = 300;
    testDiv.appendChild(vid);
  });

const testDiv = document.querySelector(".test");

let in_con, out_con; // debugging variables

let connectionIdentities = [];

peer.on("open", () => {
  const identifiers = {
    soc: socket.id,
    peer: peer.id,
  };
  socket.emit("PEER::JOINED", identifiers, (allPeerId) => {
    const list = allPeerId.filter((elt) => {
      return peer.id !== elt.peer;
    });

    connectionIdentities.push(...list);

    updateUserList(connectionIdentities.map((e) => e.peer));
    console.log("gather_ids", list, connectionIdentities, allPeerId);
  });
  console.log("peer_id", peer.id);
});

socket.on("PEER::JOINED", (ident) => {
  console.log(">ident", ident, peer.id === ident.peer);

  if (peer.id === ident.peer) return;

  connectionIdentities.push(ident);
  // let elt = document.createElement("li");
  // elt.textContent = ident;
  // document.querySelector("ul").append(elt);
  updateUserList(connectionIdentities.map((e) => e.peer));
});

socket.on("PEER::LEFT", (socketId) => {
  console.log("Peer client disconnected", socketId); //log client disconnect
  const index = connectionIdentities.findIndex((elt) => elt.soc == socketId);
  if (index >= 0) {
    connectionIdentities.splice(index, 1);
  }
  updateUserList(connectionIdentities.map((e) => e.peer));
});

function updateUserList(arr) {
  document.querySelector("ul").innerHTML = arr
    .map(
      (elt) =>
        `<li>${elt}<button onclick="connectToPeer(
        '${elt}')">connect</button><button onclick="wrapCall(
        '${elt}')">call</button></li>`
    )
    .join(" ");
}

// sending data
function connectToPeer(peerId) {
  const conn = peer.connect(peerId);
  out_con = conn;
  // conn.send("test");
  console.log("connecting to ", peerId, "...", conn);
  // conn.send("Hello");

  conn.on("open", () => {
    console.log("conn.on connection open");
    alert("Finally opened connection");

    // conn.send("Hello");
  });
  conn.on("data", (data) => {
    console.log("conn.on receive data:", data);
  });

  conn.on("error", () => {
    console.log("conn: error in data connection");
  });
}

peer.on("error", (e) => {
  console.log("peer: error", e);
});

// receiving data
peer.on("connection", (inConn) => {
  console.log("incoming connection", inConn.peer, inConn);
  in_con = inConn;
  inConn.peerConnection.oniceconnectionstatechange = (e) => {
    console.log("onconnectionstatechange", e, inConn.peer);
  };

  inConn.on("data", (msg) => {
    console.log("inConn receive data:", msg);
    // inConn.send("Hi");
  });

  inConn.on("error", () => {
    console.log("inConn: error in data connection");
  });
});

peer.on("call", (inCall) => {
  console.log("call incoming", inCall);
  inCall.answer(vid_stream);
  const videoElt = setVideoElt();
  testDiv.appendChild(videoElt);
  inCall.on("stream", function (inCallStream) {
    // set call
    videoElt.srcObject = inCallStream;
  });
});

function callPeer(id, stream) {
  console.log(stream);
  const callAnswer = peer.call(id, stream);
  const videoElt = setVideoElt();
  testDiv.appendChild(videoElt);
  console.log("our out-going", callAnswer);

  callAnswer.on("stream", function (callStream) {
    // show call

    videoElt.srcObject = callStream;
  });
}

function wrapCall(id) {
  callPeer(id, vid_stream);
}

function setVideoElt() {
  const vid = document.createElement("video");
  vid.autoplay = true;
  vid.width = 300;
  return vid;
}

const tooling = () => {
  let file = document.querySelector("#file");
  let buddy = document.querySelector("#toPeer");
  let conn = peer.connections[buddy.value][0];
  conn.send(file.files[0]);
};
