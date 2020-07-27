let socket = io();
socket.on("JOINED", (d) => {
  console.log(d, "joined");
});
new Vue({
  el: "#app",
  data: {
    search: "",
    appFiles: [],
    files: [],
    uploadPercent: 0,
  },
  created: async function () {
    let res = await fetch("/api/files");
    let files = await res.json();
    this.appFiles = [...files.data];
    this.files = [...this.appFiles];

    socket.on("FILE_UPDATE", async () => {
      let res = await fetch("/api/files");
      let files = await res.json();
      this.appFiles = files.data;
      if (this.search.length <= 0) {
        this.files = [...this.files];
      }
    });
  },
  methods: {
    upload: async function (event) {
      // let self = this;
      let file = new FormData(event.target.form);

      let ajax = new XMLHttpRequest();
      ajax.open("POST", "/api/files", true);

      ajax.upload.onprogress = (event) => {
        let { total, loaded, lengthComputable } = event;
        let val = Math.round((loaded / total) * 100);
        if (lengthComputable) {
          this.uploadPercent = val;
        }

        if (val === 100) {
          setTimeout(() => {
            this.uploadPercent = 0;
          }, 1000);
        }
      };
      ajax.send(file);
    },

    searchFile: function () {
      if (this.search.length <= 0) {
        return (this.files = [...this.appFiles]);
      }
      let searchResult = this.appFiles.filter((v) =>
        v.filename.toLowerCase().includes(this.search.toLowerCase())
      );
      this.files = searchResult;
    },

    sortFiles: function (type) {
      if (!type) return (this.files = this.appFiles);

      this.files = this.appFiles.filter((file) => file.fileType.includes(type));
    },
  },
});
