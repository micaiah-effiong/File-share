let socket = io();
socket.on("JOINED", (d) => {
  console.log(d, "joined");
});

let AppEvent = new Vue();

Vue.component("image-file", {
  template: `
    <div class="card m-2">
      <div class="card-content p-2">
        <div :title="filename" class="row">
          <div class="col-9"></div>
          <div class="col-1">
            <input
              type="checkbox"
              @change="onCheck($event)"
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
          <a :href="downloadLink" class="btn btn-link">
            <span class="fa fa-download"></span>
          </a>
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
});

Vue.component("audio-file", {
  template: `
      <div class="card  m-2 p-2" v-if="fileType.includes('audio')">
        <div class="card-content">
          <div :title="filename" class="row">
            <div class="col-9">
              {{short}}<br/>{{size}}
            </div>
            <div class="col-1">
              <input
                type="checkbox"
                @click="onCheck($event)"
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
            <a :href="downloadLink" class="btn-link">
              <span class="fa fa-download"></span>
            </a>
            <label class="ml-2 btn-link" :for="filename.split(' ').join('-')">
              <span :class="icon"></span>
            </label>
            <input type="checkbox" @change="play" :id="filename.split(' ').join('-')" hidden>
          </div>
        </div>
      </div>
  `,
  data() {
    return {
      icon: "fa fa-play",
      songLink: location.href + this.link,
    };
  },
  props: {
    filename: { required: true },
    fileType: { required: true },
    short: { required: true },
    size: { required: true },
    link: { required: true },
    downloadLink: { required: true },
    onCheck: { required: true },
  },
  methods: {
    play({ target }) {
      let player = document.querySelector("#player");
      if (target.checked) {
        console.log(
          "player.src === this.link",
          player.src,
          this.songLink,
          player.src === this.songLink
        );
        if (player.src === this.songLink) {
          player.play();
        } else {
          player.src = this.songLink;
        }
        this.icon = "fa fa-pause";
      } else {
        player.pause();
        this.icon = "fa fa-play";
      }
    },
  },
});

Vue.component("file-box", {
  template: `
    <div class="col-lg-3 col-md-4 col-sm-6 col-12">
      <image-file v-if="fileType.includes('image')"
        :filename="filename"
        :fileType="fileType"
        :short="short"
        :size="size"
        :link="link"
        :downloadLink="downloadLink"
        :onCheck="onCheck"
        :style="style"
      ></image-file>
      <audio-file v-if="fileType.includes('audio')"
        :filename="filename"
        :fileType="fileType"
        :short="short"
        :size="size"
        :link="link"
        :downloadLink="downloadLink"
        :onCheck="onCheck"></audio-file>
      <div class="card  m-2 p-2" :style="style" v-if="!fileType.includes('image') && !fileType.includes('audio')">
        <div class="card-content">
          <div :title="filename" class="row">
            <div class="col-9">
              {{short}}<br/>{{size}}
            </div>
            <div class="col-1">
              <input
                type="checkbox"
                @click="onCheck($event)"
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
            <a :href="downloadLink" class="btn-link">
              <span class="fa fa-download"></span>
            </a>
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
          // backgroundBlendMode: "color-burn",
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
      checkedFiles: {},
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
      Object.keys(this.checkedFiles).map((name) => {
        let file = this.checkedFiles[name];
        let anchor = document.createElement("a");
        anchor.setAttribute("download", name);
        anchor.href = file.link;
        anchor.click();
        anchor.remove();
        file.target.checked = !file.target.checked;
        delete this.checkedFiles[name];
      });
    },

    onCheck({
      target: {
        checked: status,
        name,
        dataset: { link },
      },
      target,
    }) {
      status
        ? (this.checkedFiles[name] = { link, target, name })
        : delete this.checkedFiles[name];
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
      if (!type) return (this.files = [...this.appFiles]);
      type = type.flat();
      this.files = [...this.appFiles]
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
            navigator.vibrate(1500);
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
        AUDIO: "audio",
        FILES: ["zip", "gzip", "txt", "gz", "rar"],
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
  computed: {
    numberOfItems() {
      let wrd = this.numberOfFiles > 1 ? "items" : "item";
      return `${this.numberOfFiles} ${wrd}`;
    },
  },
});
