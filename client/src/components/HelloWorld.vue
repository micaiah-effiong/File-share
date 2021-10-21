<template>
  <!-- <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div> -->
    <div id="app">
      <div class="pb-3">
        <div class="container top-nav" >
          <header><br /></header>
          <div class="form-group">
            <input
              type="search"
              @input="searchFile($event.target.value)"
              class="form-control"
              placeholder="Search for files"
            />
          </div>
          <div class="form-group nav" style="width: fit-content; margin: auto;">
            <button
              class="btn btn-link btn-sm mb-2"
              @click="appEvent.$emit('downloadMultiple')"
              title="download marked files"
            >
              <span class="fa fa-download"></span>
            </button>
            <button
              @click="sortFiles()"
              class="btn btn-link btn-sm mb-2 ml-1 mr-1"
              title="show all files"
            >
              <span class="">All</span>
            </button>
            <button
              @click="sortFiles('IMAGE')"
              class="btn btn-link btn-sm mb-2 ml-1 mr-1"
              title="photo"
            >
              <span class="fa fa-image"></span>
            </button>
            <button
              class="btn btn-link btn-sm mb-2 ml-1 mr-1"
              disabled
            >
              <span class=""></span>
            </button>
            <button
              @click="sortFiles('AUDIO')"
              class="btn btn-link btn-sm mb-2 ml-1 mr-1"
              title="audio"
            >
              <span class="fa fa-music"></span>
            </button>
            <button
              @click="sortFiles('VIDEO')"
              class="btn btn-link btn-sm mb-2 ml-1 mr-1"
              title="video"
            >
              <span class="fa fa-video-camera"></span>
            </button>
            <button
              @click="sortFiles('FILES')"
              class="btn btn-link btn-sm mb-2 ml-1 mr-1"
              title="files"
            >
              <span class="fa fa-file"></span>
            </button>
          </div>
          <form
            method="POST"
            action="/api/files"
            enctype="multipart/form-data"
            class="form"
          >
            <label for="upload" class="app-upload-btn"><span class="fa fa-upload fa-2"></span></label>
            <input
              type="file"
              class="btn"
              name="upload"
              id="upload"
              multiple
              @change.prevent="upload"
              hidden
            />
          </form>
          <div v-if="uploadPercent > 0" style="color: white">{{uploadPercent}}%</div>
        </div>
        <div class="container-fluid">
          <file-block></file-block>
        </div>
      </div>
      
      <footer class="card-footer app-footer">
        <div class="row">
          <div class="col-3">
            {{numberOfFiles}} <span class="fa fa-file"></span>
          </div>
          <div class="col-9 text-right"></div>
        </div>
      </footer>
    </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>