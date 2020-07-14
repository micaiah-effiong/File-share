// import moment from "./moment.min.js";
let socket = io();
socket.on("joined", (d) => {
  console.log(d, "joined");
});
new Vue({
  el: "#app",
  data: {
    search: "",
    files: [],
  },
  created: async function () {
    let res = await fetch("/api/files");
    let files = await res.json();
    this.files = files.data;

    socket.on("fileUpdate", async () => {
      let res = await fetch("/api/files");
      let files = await res.json();
      this.files = files.data;
    });
  },
});
