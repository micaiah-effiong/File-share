<template>
  <div class="w-full h-full flex gap-14 dark bg-ocean-blue-light">
    <nav class="w-28 py-5 bg-white">
      <div class="grid gap-6">
        <div class="text-ocean-blue-dark">logo</div>
        <div class="grid gap-8 text-md text-ocean-blue-dark">
          <div
            class="
              grid
              justify-items-center
              gap-2
              hover:text-ash-light hover:nav-highlight
            "
          >
            <HomeIcon class="w-5" />
            <span class="text-xs uppercase">home</span>
          </div>
          <div
            class="
              grid
              justify-items-center
              gap-2
              hover:text-ash-light hover:nav-highlight
            "
          >
            <FolderIcon class="w-5" />
            <span class="text-xs uppercase">Recent</span>
          </div>
          <div
            class="
              grid
              justify-items-center
              gap-2
              hover:text-ash-light hover:nav-highlight
            "
          >
            <VideoCameraIcon class="w-5" />
            <span class="text-xs uppercase">video</span>
          </div>
          <div
            class="
              grid
              justify-items-center
              gap-2
              hover:text-ash-light hover:nav-highlight
            "
          >
            <PhotographIcon class="w-5" /><span class="text-xs uppercase"
              >phote</span
            >
          </div>
          <div
            class="
              grid
              justify-items-center
              gap-2
              hover:text-ash-light hover:nav-highlight
            "
          >
            <CogIcon class="w-5" /><span class="text-xs uppercase"
              >settings</span
            >
          </div>
        </div>
      </div>
    </nav>
    <main class="w-full py-5 gap-8 flex flex-col">
      <header class="">
        <div class="flex justify-between py-3 text-ocean-blue-dark">
          <div>Logo</div>

          <div class="flex gap-5">
            <div><PlusCircleIcon class="w-5" /></div>
            <div><SearchIcon class="w-5" /></div>
            <div><StarIcon class="w-5" /></div>
          </div>
        </div>
        <!-- <div class="cut"></div> -->
        <nav class="cut">
          <div class="flex justify-between text-ocean-blue-dark">
            <div class="flex gap-6 p-3 flex-1">
              <div class="flex gap-2 shadow-md p-2 rounded-lg">
                <FolderIcon class="w-5" />
                <ChevronDownIcon class="w-3" />
              </div>
              <button>Recent Files</button>
            </div>

            <div class="flex items-center">
              <div
                class="
                  flex
                  justify-between
                  p-2
                  rounded-md
                  bottom-2
                  border-black
                  gap-5
                  bg-ocean-blue-accent
                "
              >
                <button class="w-5 h-5">
                  <MenuIcon class="text-xs" />
                </button>
                <button class="w-5 h-5"><ViewBoardsIcon /></button>
                <button class="w-5 h-5"><ViewGridIcon /></button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div
          class="
            w-3/12
            rounded-lg
            mono:bg-ash-normal
            mono:text-ash-accent
            mono:hover:bg-ash-secondary
            mono:hover:transition-colors
            transition-colors
          "
        >
          <div class="grid w-full p-3 border-2 rounded-md">
            <div>
              <div class="flex justify-between py-1">
                <button>
                  <StarIcon class="w-5 text-ocean-blue-secondary" />
                </button>
                <button>
                  <DotsVerticalIcon
                    class="w-5 mono:text-ash-light text-ocean-blue-secondary"
                  />
                </button>
              </div>
              <div class="grid gap-3 py-5 justify-center text-center">
                <div class="text-[4rem] flex justify-center">
                  <span
                    ><DocumentIcon class="h-16 text-ocean-blue-secondary"
                  /></span>
                </div>
                <div class="text-[0.8rem] text-[#4e788f] font-semibold">
                  file-name.png
                </div>
              </div>
            </div>
            <!-- <div class="cut"></div> -->
            <div class="flex pt-3 pb-2 cut justify-between items-center">
              <div class="uppercase text-xs text-[#89a5b4]">2mb</div>
              <div>
                <div
                  class="
                    outline-1 outline-white
                    bg-red-500
                    w-6
                    h-6
                    rounded-md
                    flex
                    justify-center
                    items-center
                    text-sm
                    font-semibold
                    text-white
                    p-1
                  "
                >
                  <span>O</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="grid p-2 gap-1 h-[10rem]">
          <div class="bg-[#81c5f6]">secondary</div>
          <div class="bg-[#e8f0f7]">accent</div>
          <div class="bg-[#078dee]">normal</div>
          <div class="bg-[#4d788f]">dark</div>
          <div class="bg-[#f5f9fd]">bg light</div>
        </div>
      </main>
    </main>
    <aside class="w-28 py-5 bg-white">side</aside>
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
  ChevronDownIcon,
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
    ChevronDownIcon,
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
  border-top: 0.5px solid #e5e7eb;
  position: relative;
}

.cut::before {
  border-left: 0.3px solid #e5e7eb;
  left: 0.3rem;
}

.cut::after {
  border-right: 0.3px solid #e5e7eb;
  right: 0.3rem;
}

.cut::after,
.cut::before {
  height: 0.4rem;
  content: "";
  top: -0.25rem;
  position: absolute;
}

.hover\:nav-highlight:hover {
  box-shadow: 2px 0px #86868a;
  transition-property: color;
  transition-duration: 0.3s;
}
</style>
