let socket = io();
socket.on("JOINED", (d) => {
  console.log(d, "joined");
});

let AppEvent = new Vue();

Vue.component("file-box", {
  template: `
    <div class="col-lg-3 col-md-4 col-sm-6 col-12">
      <div class="card p-2 m-2">
        <div class="card-content">
          <div :title="filename">{{short}}</div>
          <hr />
          <div>
            <small>
              {{fileType.substr(fileType.indexOf('/')+1)}} file
            </small>
          </div>
          <div>{{size}}</div>
        </div>
        <a :href="link" class="btn-link">Download</a>
      </div>
    </div>
  `,
  props: {
    filename: { required: true },
    fileType: { required: true },
    short: { required: true },
    size: { required: true },
    link: { required: true },
  },
});

Vue.component("file-block", {
  template: `
    <div class="row">
      <template v-for="file, key of files">
        <file-box
          v-if="files.length > 0"
          :filename="file.filename"
          :fileType="file.fileType"
          :short="file.short"
          :size="file.size"
          :link="file.link"
          :key="key"
        >
        </file-box>
      </template>
      <div v-if="files.length <= 0">Sorry no files to download</div>
    </div>
  `,
  data() {
    return {
      search: "",
      files: [],
      appFiles: [],
    };
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
      this.files = [...this.files];
      if (this.search.length > 0) {
        this.searchFile(this.search);
      }
    });

    AppEvent.$on("searchFile", this.searchFile);
    AppEvent.$on("sortFiles", this.sortFiles);
  },
  methods: {
    searchFile: function (searchStr) {
      this.search = searchStr;
      if (searchStr.length <= 0) {
        return (this.files = [...this.appFiles]);
      }
      let searchResult = this.appFiles.filter((v) =>
        v.filename.toLowerCase().includes(searchStr.toLowerCase())
      );
      this.files = searchResult;
    },

    sortFiles: function (type) {
      if (!type) return (this.files = this.appFiles);
      type = type.flat();
      this.files = this.appFiles
        // create a replica file with pos
        .map(({ filename, fileType }, index) => {
          return { filename, fileType, pos: index };
        })
        // filter files checking two way matches
        .filter((item) => {
          return type.includes(item.fileType) || item.fileType.includes(type);
        })
        // return files that match the same position and filename
        .map((file, index) => {
          if (this.appFiles[file.pos].filename === file.filename) {
            return this.appFiles[file.pos];
          }
        });
    },
  },
});

new Vue({
  el: "#app",
  data: {
    appFiles: [],
    search: "",
    files: [],
    uploadPercent: 0,
  },
  methods: {
    upload: async function (event) {
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
      AppEvent.$emit("searchFile", this.search);
    },

    sortFiles: function (type) {
      let format = {
        IMGAGE: "image",
        VIDEO: "video",
        FILES: ["zip", "gzip"],
        APP: "octet-stream",
      };

      let extension;
      if (type == "APP" || type == "FILES") {
        extension = [format[type]].flat().map((ext) => "application/" + ext);
      } else {
        extension = [format[type]].flat();
      }
      AppEvent.$emit("sortFiles", extension);
    },
  },
});
