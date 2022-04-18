<template>
  <div class="w-full h-full flex gap-14 dark bg-ocean-blue-light">
    <nav class="w-28 py-7 bg-white">
      <div class="grid gap-6">
        <div class="text-ocean-blue-dark flex justify-center">
          <RssIcon class="w-10" />
        </div>
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
    <main class="w-full py-7 gap-8 flex flex-col">
      <header class="">
        <div class="flex justify-between gap-4 text-ocean-blue-dark">
          <RssIcon class="w-5" />
          <div class="flex-1">
            <input
              class="w-full outline-none bg-transparent"
              type="search"
              name=""
              id=""
            />
          </div>
          <div class="flex gap-5">
            <PlusCircleIcon class="w-5" />
            <SearchIcon class="w-5" />
            <StarIcon class="w-5" />
          </div>
        </div>
        <div class="py-5">
          <div class="cut"></div>
        </div>
        <nav>
          <div class="flex justify-between text-ocean-blue-dark">
            <div class="flex gap-6 flex-1">
              <div class="flex gap-2 shadow-md p-2 rounded-lg bg-white">
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
                  h-auto
                  rounded-md
                  bottom-2
                  border-black
                  gap-5
                  bg-ocean-blue-accent
                  shadow-ms shadow-inner
                "
              >
                <button>
                  <MenuIcon class="text-xs w-5" />
                </button>
                <button class="shadow-md rounded-sm bg-white p-0.5">
                  <ViewBoardsIcon class="text-md w-5" />
                </button>
                <button>
                  <ViewGridIcon class="text-xs w-5" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <div>
          <div
            class="
              bg-white
              w-4/12
              rounded-lg
              shadow-sm
              mono:bg-ash-normal
              mono:text-ash-accent
              mono:hover:bg-ash-secondary
              mono:hover:transition-colors
              transition-colors
            "
          >
            <div class="grid w-full p-3 rounded-md">
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
                  <div class="text-[0.8rem] text-ocean-blue-dark font-semibold">
                    file-name.png
                  </div>
                </div>
              </div>
              <!-- <div class="cut"></div> -->
              <div class="flex pt-3 pb-2 cut justify-between items-center">
                <div class="uppercase text-xs text-ocean-blue-dark">2mb</div>
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
    <aside class="max-w-5/12 w-5/12 py-7 bg-white">
      <div class="h-full overflow-auto">
        <header class="px-3">
          <div class="flex gap-2 text-ocean-blue-dark">
            <DocumentTextIcon class="w-5" />
            <span>File Preview</span>
          </div>
          <div class="py-5">
            <div class="cut"></div>
          </div>
        </header>
        <main class="px-10 text-sm text-ocean-blue-dark">
          <div class="grid gap-7">
            <div class="grid gap-3">
              <div class="flex justify-center">
                <DocumentIcon class="h-48 text-ocean-blue-secondary" />
              </div>
              <div class="grid gap-2">
                <div class="font-semibold break-all">
                  users-file-screenshots-image-media-somefile.png
                </div>
                <div class="text-xs">2.5GB</div>
              </div>
            </div>
            <div class="cut"></div>
            <div class="break-words grid gap-2">
              <div class="font-semibold">Description</div>
              <div class="text-xs leading-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                tempus suscipit dolor tincidunt gravida. Praesent ac rutrum
                massa. Cras vestibulum magna a tortor varius, nec interdum dui
                dapibus.
              </div>
            </div>
            <div class="cut"></div>
            <div class="grid gap-2">
              <div class="font-semibold">Shared with:</div>
              <div class="grid">
                <div class="flex gap-3 items-center">
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
                    <span>S</span>
                  </div>
                  <div>Olive Silver</div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div class="border-t mt-7 py-5 px-10">
          <div class="flex justify-between text-xs text-ocean-blue-dark gap-3">
            <div class="grid gap-3 justify-items-center">
              <div class="w-6 text-white bg-ocean-blue-normal rounded-md p-1">
                <ExternalLinkIcon />
              </div>
              <div>Share</div>
            </div>
            <div class="grid gap-3 justify-items-center">
              <div class="w-6 text-white bg-ocean-blue-normal rounded-md p-1">
                <PencilIcon />
              </div>
              <div>Edit</div>
            </div>
            <div class="grid gap-3 justify-items-center">
              <div class="w-6 text-white bg-ocean-blue-normal rounded-md p-1">
                <TrashIcon />
              </div>
              <div>Delete</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
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
  RssIcon,
  DocumentTextIcon,
  ExternalLinkIcon,
  PencilIcon,
  TrashIcon,
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
    RssIcon,
    DocumentTextIcon,
    ExternalLinkIcon,
    PencilIcon,
    TrashIcon,
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
  height: 100vh;
  width: 100%;
  border: 1px solid salmon;
}

.cut {
  border-top: 1.5px solid #e5e7eb;
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
  height: 0.6rem;
  content: "";
  top: -0.38rem;
  position: absolute;
}

.hover\:nav-highlight:hover {
  box-shadow: 2px 0px #078dee;
  transition-property: box-shadow;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
}
</style>
