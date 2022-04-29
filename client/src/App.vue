<template>
  <div class="flex flex-col h-full w-full justify-between">
    <div class="w-full h-full flex gap-14 bg-ocean-blue-light">
      <Nav />
      <main
        class="
          h-full
          w-full
          py-7
          gap-5
          md:gap-8
          flex flex-col
          px-4
          md:px-0
          border-red-500
        "
      >
        <header class="sticky bg-ocean-blue-light top-7">
          <div class="flex justify-between gap-4 text-ocean-blue-dark">
            <RssIcon class="w-5" />
            <div class="flex-1">
              <input
                class="
                  w-full
                  outline-none
                  bg-transparent
                  text-sm
                  align-baseline
                "
                type=""
                name=""
                id="searchField"
                placeholder="search /"
              />
            </div>
            <div class="flex gap-5">
              <input type="file" hidden id="uploadField" />
              <label for="uploadField">
                <PlusCircleIcon class="w-5" />
              </label>
              <label for="searchField">
                <SearchIcon class="w-5" />
              </label>
              <StarIcon class="w-5" />
            </div>
          </div>
          <div class="py-5">
            <div class="cut"></div>
          </div>
          <!-- nan.hidden.md:block -->
          <nav class="">
            <div class="flex justify-between text-ocean-blue-dark">
              <div class="flex gap-2 md:gap-6 flex-1">
                <div class="flex gap-2 shadow-md p-2 rounded-lg bg-white">
                  <FolderIcon class="w-5 text-ocean-blue-normal" />
                  <ChevronDownIcon class="w-3" />
                </div>

                <button class="hidden align-middle md:block">
                  Recent Files
                </button>
              </div>

              <div class="flex items-center">
                <div
                  class="
                    flex
                    justify-between
                    py-1
                    px-2
                    h-auto
                    rounded-md
                    bottom-2
                    border-black
                    gap-4
                    bg-ocean-blue-accent
                    shadow-ms shadow-inner
                  "
                >
                  <button>
                    <MenuIcon class="text-xs w-5" />
                  </button>
                  <button class="shadow-md rounded-[4px] bg-white py-1 px-1">
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
        <main class="h-full">
          <div class="h-full overflow-auto">
            <!-- GRID FILE ITEM -->
            <GridFileItem filename="file-name.png" size="2mb" />
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
    <!-- <div class="h-16 bg-green-800 bottom-0 border-2 border-red-500"></div> -->
    <div class="h-16 md:hidden fixed w-full bottom-0">
      <BottomNav />
    </div>
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
import BottomNav from "./layouts/Nav/BottomNav.vue";
import FilePreview from "./layouts/FilePreview/FilePreview.vue";
import GridFileItem from "./components/File/GridFileItem/GridFileItem.vue";

export default defineComponent({
  components: {
    Nav,
    BottomNav,
    FilePreview,
    GridFileItem,
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
