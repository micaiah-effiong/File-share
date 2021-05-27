let socket = io();
socket.on("JOINED", (d) => {
  console.log(d, "joined");
});

let AppEvent = new Vue();

Vue.component("image-file", {
  template: `
    <div class="card m-2" >
      <div
        class="p-2 img-card"
        :style="{'background-image': 'url('+ link +')'}"
      >
        <input
          type="checkbox"
          @change="onCheck($event)"
          :name="filename"
          :data-link="link"
          style="position: absolute; right: 8px;"
        />
        <!--<img class="app-img-preview" :src="link"/>-->
        <div :title="filename" class="row">
          <div class="col-10"></div>
          <div class="col-1">
            
          </div>
        </div>
        <!--
          <hr />
          <div></div>
        -->
      </div>
      <div class="container file-details">
      <div class="p-1 row">
        <small class="col-8 txt-white">{{short}}<br/>{{size}}</small>
        <div class="col-4">
          <a :href="downloadLink" class="btn btn-link">
            <span class="fa fa-download download-icon"></span>
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
});

Vue.component("audio-file", {
  template: `
      <div class="card others m-2" v-if="fileType.includes('audio')">
        <div class="other-files-card-content p-2">
          <input
            type="checkbox"
            @click="onCheck($event)"
            :name="filename"
            :data-link="link"
            style="position: absolute; right: 8px;"
          />
          <div :title="filename" class="holder-text">
          {{filename.split(".").reverse()[0]}}
          </div>
        </div>
        <div class="container file-details">
          <div class="p-1 row">
            <small class="col-8 txt-white">{{short}}<br/>{{size}}</small>
            <div class="col-4" style="display: flex; justify-content: flex-end;">
              <a :href="downloadLink" class="btn btn-link">
                <span class="fa fa-download download-icon"></span>
              </a>
              <label class="btn btn-link" :for="filename.split(' ').join('-')"
                style="margin: 0;"
              >
                <span :class="icon"></span>
              </label>
              <input
                type="checkbox"
                @change="play"
                :id="filename.split(' ').join('-')"
                hidden
              >
            </div>
          </div>
        </div>
      </div>
  `,
  data() {
    return {
      icon: "fa fa-play download-icon",
      player: new Audio(this.link),
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
      if (target.checked) {
        this.player.play();
        this.icon = "fa fa-pause hover-color";
      } else {
        this.player.pause();
        this.icon = "fa fa-play download-icon";
      }
    },
  },
});

Vue.component("video-file", {
  template: `
      <div class="card others m-2" v-if="fileType.includes('video')">
        <div class="video-card-content p-2" :hidden="hidePlayerWrapper">
          <video :src="link" ref="video" style="height: 100%; width: 100%;"></video>
        </div>
        <div class="other-files-card-content p-2" :hidden="!hidePlayerWrapper">
          <input
            type="checkbox"
            @click="onCheck($event)"
            :name="filename"
            :data-link="link"
            style="position: absolute; right: 8px;"
          />
          <div :title="filename" class="holder-text">
          {{filename.split(".").reverse()[0]}}
          </div>
        </div>
        <div class="container file-details">
          <div class="p-1 row">
            <small class="col-8 txt-white">{{short}}<br/>{{size}}</small>
            <div class="col-4" style="display: flex; justify-content: flex-end;">
              <a :href="downloadLink" class="btn btn-link">
                <span class="fa fa-download download-icon"></span>
              </a>
              <label class="btn btn-link" :for="filename.split(' ').join('-')"
                style="margin: 0;"
              >
                <span :class="icon"></span>
              </label>
              <input
                type="checkbox"
                @change="play"
                :id="filename.split(' ').join('-')"
                hidden
              >
            </div>
          </div>
        </div>
      </div>
  `,
  data() {
    return {
      icon: "fa fa-play download-icon",
      player: this.$refs.video,
      hidePlayerWrapper: true,
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
  mounted() {
    this.$refs.video.onended = () => {
      this.pauseVideo();
    };
  },
  methods: {
    play({ target }) {
      if (target.checked) {
        this.$refs.video.play();
        this.icon = "fa fa-pause hover-color";
        this.hidePlayerWrapper = false;
      } else {
        this.$refs.video.pause();
        this.icon = "fa fa-play download-icon";
        this.hidePlayerWrapper = true;
      }
    },
    pauseVideo() {
      this.$refs.video.pause();
      this.icon = "fa fa-play download-icon";
      this.hidePlayerWrapper = true;
    },
  },
});

Vue.component("file-box", {
  template: `
    <div class="col-lg-3 col-md-4 col-sm-6 col-12" style="height: 100%;">
      <image-file v-if="fileType.includes('image')"
        :filename="filename"
        :fileType="fileType"
        :short="short"
        :size="size"
        :link="link"
        :downloadLink="downloadLink"
        :onCheck="onCheck"
      ></image-file>
      <audio-file v-if="fileType.includes('audio')"
        :filename="filename"
        :fileType="fileType"
        :short="short"
        :size="size"
        :link="link"
        :downloadLink="downloadLink"
        :onCheck="onCheck"
      ></audio-file>
      <video-file v-if="fileType.includes('video')"
        :filename="filename"
        :fileType="fileType"
        :short="short"
        :size="size"
        :link="link"
        :downloadLink="downloadLink"
        :onCheck="onCheck"
      ></video-file>
      <div class="card others m-2" v-if="!fileType.includes('image') && !fileType.includes('audio') && !fileType.includes('video')">
        <div class="other-files-card-content p-2">
          <input
            type="checkbox"
            @click="onCheck($event)"
            :name="filename"
            :data-link="link"
            style="position: absolute; right: 8px;"
          />
          <div :title="filename" class="holder-text">
          {{filename.split(".").reverse()[0]}}
          </div>
        </div>
        <div class="container file-details">
          <div class="p-1 row">
            <small class="col-8 txt-white">{{short}}<br/>{{size}}</small>
            <div class="col-4">
              <a :href="downloadLink" class="btn btn-link">
                <span class="fa fa-download download-icon"></span>
              </a>
            </div>
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
    streamLink: { required: true },
    onCheck: { required: true },
  },
  computed: {
    splitFileType() {
      return this.$props.fileType.substr(this.$props.fileType.indexOf("/") + 1);
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
          :streamLink="file.streamLink"
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
    await this.fetchFiles();

    socket.on("FILE_UPDATE", async () => {
      await this.fetchFiles();
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

    fetchFiles: async function () {
      let res = await fetch("/api/files");
      let files = await res.json();
      this.appFiles = [...files.data];
      this.files = [...this.appFiles];
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
      this.search = searchStr.toLowerCase();
      if (this.search.length <= 0) {
        return (this.files = [...this.appFiles]);
      }

      let searchResult = this.files.filter((v) =>
        v.filename.toLowerCase().includes(this.search)
      );
      this.files = searchResult;
    },

    sortFiles(type) {
      // types is passed by the parent component raise by $event
      if (!type) {
        this.files = [...this.appFiles];
        return this.files;
      }
      // ensure type is a one level array
      type = type.flat();
      this.files = [...this.appFiles]
        // create a replica of file with pos
        /*.map(({ filename, fileType }, index) => {
          return { filename, fileType, pos: index };
        })*/
        // filter files checking two way matches
        .filter((item) => {
          return type.includes(item.fileType) || item.fileType.includes(type);
        });
      // return files that match the same position and filename
      /*.map((file, index) => {
          if (this.appFiles[file.pos].filename === file.filename) {
            return this.appFiles[file.pos];
          }
        });*/
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
    inProgress: {},
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
      // let file = new FormData(event.target.form);
      let files = [...event.target.form.upload.files];
      files.forEach((item) => {
        let file = new FormData();
        file.append("upload", item);
        this.inProgress[item.name] = {
          uploadPercent: 0,
        };

        let ajax = new XMLHttpRequest();
        ajax.open("POST", "/api/files", true);

        ajax.upload.onprogress = (event) => {
          let { total, loaded, lengthComputable } = event;
          let val = Math.round((loaded / total) * 100);
          if (lengthComputable) {
            // this.uploadPercent = val;
            this.inProgress[item.name].uploadPercent = val;
            let progress = Object.values(this.inProgress).map(
              (a) => a.uploadPercent
            );
            let _val = progress.reduce((a, b) => a + b);
            let progressPer = parseInt(_val / progress.length);
            // console.log(progressPer);
            this.uploadPercent = progressPer;
          }

          if (val === 100) {
            setTimeout(() => {
              this.uploadPercent = 0;
              delete this.inProgress[item.name];
              navigator.vibrate([500, 300]);
            }, 1000);
          }
        };

        ajax.onerror = (e) => {
          // delete from inProgress
          // delete this.inProgress[]
          // this.uploadPercent = 0;
          console.log(e);
          delete this.inProgress[item.name];
          alert("An error occured while uploading a file");
        };

        ajax.onload = () => {
          // delete from inProgress
          // delete this.inProgress[]
          delete this.inProgress[item.name];
        };
        ajax.send(file);
      });
    },

    searchFile: function (str) {
      AppEvent.$emit("searchFile", str);
    },

    sortFiles: function (type) {
      let format = {
        IMAGE: "image",
        VIDEO: "video",
        AUDIO: "audio",
        FILES: [
          "zip",
          "gzip",
          "txt",
          "gz",
          "rar",
          "vnd.openxmlformats-officedocument.wordprocessingml.document",
          "vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "gz",
        ],
        APP: "octet-stream",
      };

      let extension;
      if (type === "APP" || type === "FILES") {
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
