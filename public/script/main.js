console.log(
  `%c File share app running %c App Started %c`,
  "background:#35495e ; padding: 2px; border-radius: 3px 0 0 3px;  color: #fff",
  "background:#41b883 ; padding: 2px; border-radius: 0 3px 3px 0;  color: #fff",
  "background:transparent; padding: 2px"
);

let socket = io();
socket.on("joined", (d) => {
  console.log(d, "joined");
});
new Vue({
  el: "#app",
  data: {
    search: "",
    files: [],
    uploadPercent: 0,
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
  methods: {
    upload: async function (event) {
      let self = this;
      let file = new FormData(event.target.form);

      let ajax = new XMLHttpRequest();
      ajax.open("POST", "/api/files", true);

      ajax.upload.onprogress = (event) => {
        let { total, loaded, lengthComputable } = event;
        let val = Math.round((loaded / total) * 100);
        if (lengthComputable) {
          self.uploadPercent = val;
        }

        if (val === 100) {
          setTimeout(() => {
            self.uploadPercent = 0;
          }, 1000);
        }
      };
      ajax.send(file);
    },
  },
});
