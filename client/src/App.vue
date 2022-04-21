<template>
  <div class="w-full h-full flex gap-14 dark bg-ocean-blue-light">
    <Nav />
    <main class="h-full w-full py-7 gap-8 flex flex-col">
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
                <FolderIcon class="w-6 text-ocean-blue-normal" />
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
                    <span>
                      <DocumentIcon class="h-16 text-ocean-blue-secondary" />
                    </span>
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

        <!-- <div class="grid p-2 gap-1 h-[10rem]">
          <div class="bg-[#81c5f6]">secondary</div>
          <div class="bg-[#e8f0f7]">accent</div>
          <div class="bg-[#078dee]">normal</div>
          <div class="bg-[#4d788f]">dark</div>
          <div class="bg-[#f5f9fd]">bg light</div>
        </div> -->
      </main>
    </main>
    <FilePreview />
  </div>
</template>

<script lang="ts" >
import { defineComponent } from "vue";
import {
  // FolderIcon,
  MenuIcon,
  ViewGridIcon,
  ViewBoardsIcon,
  StarIcon,
  DotsVerticalIcon,
  PlusCircleIcon,
  SearchIcon,
  ChevronDownIcon,
  RssIcon,
} from "@heroicons/vue/outline";
import { DocumentIcon, FolderIcon } from "@heroicons/vue/solid";
import "./App.css";
import Nav from "./layouts/Nav/Nav.vue";
import FilePreview from "./layouts/FilePreview/FilePreview.vue";

export default defineComponent({
  components: {
    Nav,
    FilePreview,
    FolderIcon,
    MenuIcon,
    ViewGridIcon,
    ViewBoardsIcon,
    StarIcon,
    DotsVerticalIcon,
    PlusCircleIcon,
    SearchIcon,
    ChevronDownIcon,
    RssIcon,
    DocumentIcon,
  },
});
</script>