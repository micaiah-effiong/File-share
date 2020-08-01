let socket = io();
socket.on("JOINED", (d) => {
  console.log(d, "joined");
});

let AppEvent = new Vue();

Vue.component("file-box", {
  template: `
    <div class="col-lg-3 col-md-4 col-sm-6 col-12">
      <div class="card  m-2" :style="style" v-if="fileType.includes('image')">
        <div class="card-content p-2">
          <div :title="filename" class="row">
            <div class="col-9"></div>
            <div class="col-1">
              <input
                type="checkbox"
                @click="onCheck($event.target)"
                :name="filename"
                :data-link="link"
              />
            </div>
          </div>
          <hr />
          <div></div>
        </div>
        <div class="mt-2 file-details">
          <small>{{short}}<br/>{{size}}</small>
          <div>
            <a :href="downloadLink" class="btn-link">Download</a>
          </div>
        </div>
      </div>
      <div class="card  m-2 p-2" :style="style" v-if="!fileType.includes('image')">
        <div class="card-content">
          <div :title="filename" class="row">
            <div class="col-9">
              {{short}}<br/>{{size}}
            </div>
            <div class="col-1">
              <input
                type="checkbox"
                @click="onCheck($event.target)"
                :name="filename"
                :data-link="link"
              />
            </div>
          </div>
          <hr />
          <div></div>
        </div>
        <div class="mt-2">
          <div>
            <a :href="downloadLink" class="btn-link">Download</a>
          </div>
        </div>
      </div>
    </div>
  `,
  props: {
    filename: { required: true },
    fileType: { required: true },
    short: { required: true },
    size: { required: true },
    link: { required: true },
    downloadLink: { required: true },
    onCheck: { required: true },
  },
  computed: {
    splitFileType() {
      return this.$props.fileType.substr(this.$props.fileType.indexOf("/") + 1);
    },

    style() {
      if (this.$props.fileType.includes("image")) {
        return {
          backgroundImage: `url("/${this.$props.link}")`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundBlendMode: "color-burn",
          backgroundColor: "#343a40ba",
          color: "white",
        };
      } else {
        return { backgroundColor: "inherit" };
      }
    },
  },
});

Vue.component("file-block", {
  template: `
    <div class="row app-padd-3">
      <template v-for="file, key of files">
        <file-box
          v-if="files.length > 0"
          :filename="file.filename"
          :fileType="file.fileType"
          :short="file.short"
          :size="file.size"
          :link="file.link"
          :downloadLink="file.downloadLink"
          :onCheck="onCheck"
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
      checkedFiles: [],
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
      console.log("FILE_UPDATE...");
      let res = await fetch("/api/files");
      let files = await res.json();
      this.appFiles = files.data;
      this.files = [...this.appFiles];
      if (this.search.length > 0) {
        this.searchFile(this.search);
      }
    });

    AppEvent.$on("searchFile", this.searchFile);
    AppEvent.$on("sortFiles", this.sortFiles);
    AppEvent.$on("downloadMultiple", this.downloadMultiple);
  },
  methods: {
    downloadMultiple: function () {
      console.log("downloading multiple");
      this.checkedFiles.map((link) => {
        let anchor = document.createElement("a");
        anchor.setAttribute("download", true);
        anchor.href = link;
        anchor.click();
        anchor.remove();
      });
    },

    onCheck({ checked: status, name, dataset: { link } }) {
      status
        ? this.checkedFiles.push(link)
        : this.checkedFiles.splice(this.checkedFiles.indexOf(link), 1);
    },

    searchFile(searchStr) {
      this.search = searchStr;
      if (searchStr.length <= 0) {
        return (this.files = [...this.appFiles]);
      }
      let searchResult = this.files.filter((v) =>
        v.filename.toLowerCase().includes(searchStr.toLowerCase())
      );
      this.files = searchResult;
    },

    sortFiles(type) {
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

  watch: {
    files() {
      return AppEvent.$emit("countFile", this.files.length);
    },
  },
});

new Vue({
  el: "#app",
  data: {
    uploadPercent: 0,
    appEvent: AppEvent,
    numberOfFiles: 0,
  },
  created() {
    AppEvent.$on("countFile", (num) => {
      console.log("countFile....");
      this.numberOfFiles = num;
    });
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

    searchFile: function (str) {
      AppEvent.$emit("searchFile", str);
    },

    sortFiles: function (type) {
      let format = {
        IMAGE: "image",
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
