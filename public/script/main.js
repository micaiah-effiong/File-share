// import moment from "./moment.min.js";

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
  },
});
