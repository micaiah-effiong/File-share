<template>
  <div class="w-full h-full flex gap-14">
    <nav class="w-28 border-2 py-5 bg-ash-normal">
      <div class="grid gap-6">
        <div>logo</div>
        <div class="grid gap-8 text-lg text-ash-accent">
          <div class="grid justify-items-center gap-2">
            <HomeIcon class="w-7" />
            <span class="text-sm uppercase">home</span>
          </div>
          <div class="grid justify-items-center gap-2">
            <FolderIcon class="w-7" />
            <span class="text-sm uppercase">Recent</span>
          </div>
          <div class="grid justify-items-center gap-2">
            <VideoCameraIcon class="w-7" />
            <span class="text-sm uppercase">video</span>
          </div>
          <div class="grid justify-items-center gap-2">
            <PhotographIcon class="w-7" /><span class="text-sm uppercase"
              >phote</span
            >
          </div>
          <div class="grid justify-items-center gap-2">
            <CogIcon class="w-7" /><span class="text-sm uppercase"
              >settings</span
            >
          </div>
        </div>
      </div>
    </nav>
    <main class="border-2 border-red-600 w-full py-5 flex flex-col">
      <header class="border-2">
        <div class="flex justify-between py-3">
          <div>Logo</div>

          <div class="flex gap-10 border-2">
            <div><PlusCircleIcon class="w-5" /></div>
            <div><SearchIcon class="w-5" /></div>
            <div><StarIcon class="w-5" /></div>
          </div>
        </div>
      </header>
      <!-- <div class="cut"></div> -->
      <nav class="cut border-2">
        <div class="flex justify-between">
          <div class="flex gap-6 border-2 border-red-500 p-3">
            <FolderIcon class="w-5" />

            <div>Recent Files</div>
          </div>

          <div
            class="
              flex
              justify-evenly
              w-2/12
              gap-3
              border-2 border-red-500
              items-center
            "
          >
            <button class="w-5 h-5 border-2">
              <MenuIcon class="text-xs" />
            </button>
            <button class="w-5 h-5 border-2"><ViewBoardsIcon /></button>
            <button class="w-5 h-5 border-2"><ViewGridIcon /></button>
          </div>
        </div>
      </nav>
      <main>
        <div class="border-2 w-3/12 rounded-lg bg-ash-normal">
          <div class="grid justify-centerborder-2 border-red w-full p-3">
            <div>
              <div class="flex justify-between border py-1">
                <span>
                  <StarIcon class="w-5" />
                </span>
                <span><DotsVerticalIcon class="w-5 text-ash-light" /></span>
              </div>
              <div class="border-2 grid gap-3 py-5 justify-center text-center">
                <div class="text-[4rem] flex justify-center">
                  <span><DocumentIcon class="h-16" /></span>
                </div>
                <div class="text-[0.8rem]">file-name.png</div>
              </div>
            </div>
            <!-- <div class="cut"></div> -->
            <div class="flex border-2 py-3 cut justify-between items-center">
              <div class="uppercase text-xs">2mb</div>
              <div>extras</div>
            </div>
          </div>
        </div>
      </main>
    </main>
    <aside class="w-28 py-5 border-2">side</aside>
  </div>
</template>

<script>
// import Navbar from "./components/Navbar.vue";
// import UploadPage from "./components/UploadPage.vue";
// import Footer from "./components/Footer.vue";
import {
  FolderIcon,
  HomeIcon,
  CogIcon,
  VideoCameraIcon,
  PhotographIcon,
  MenuIcon,
  ViewGridIcon,
  ViewBoardsIcon,
  StarIcon,
  DotsVerticalIcon,
  PlusCircleIcon,
  SearchIcon,
} from "@heroicons/vue/outline";
import { DocumentIcon } from "@heroicons/vue/solid";

export default {
  name: "App",
  components: {
    // Navbar,
    // UploadPage,
    // Footer,
    FolderIcon,
    HomeIcon,
    CogIcon,
    VideoCameraIcon,
    PhotographIcon,
    MenuIcon,
    ViewGridIcon,
    ViewBoardsIcon,
    StarIcon,
    DotsVerticalIcon,
    DocumentIcon,
    PlusCircleIcon,
    SearchIcon,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik&display=swap");
#app {
  background-color: #fbfafb;
  font-family: "Rubik", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  width: 100%;
  border: 1px solid salmon;
}

.cut {
  border-top: 0.5px solid #0004;
  position: relative;
}

.cut::before {
  border-left: 0.3px solid #0004;
  left: 0.3rem;
}

.cut::after {
  border-right: 0.3px solid #0004;
  right: 0.3rem;
}

.cut::after,
.cut::before {
  height: 0.4rem;
  content: "";
  top: -0.25rem;
  position: absolute;
}
</style>
