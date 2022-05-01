<template>
  <div class="flex flex-col h-full w-full justify-between">
    <div class="w-full h-full flex gap-14 bg-ocean-blue-light">
      <Nav />
      <main
        class="
          h-full
          w-full
          py-7
          gap-0
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
                placeholder="Ctrl + k"
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
              <label>
                <StarIcon class="w-5" />
              </label>
            </div>
          </div>
          <div class="py-5">
            <div class="cut"></div>
          </div>

          <!-- <nav class=""> -->
          <nav class="hidden md:block">
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
                <!-- VIEW SWITCHER -->
                <ViewSwitcher />
              </div>
            </div>
          </nav>
        </header>
        <main class="h-[calc(100vh-185px)]">
          <div class="h-full">
            <div
              class="
                h-full
                grid
                gap-3
                grid-cols-2
                md:grid-cols-3
                py-2
                overflow-auto
              "
            >
              <!-- GRID FILE ITEM -->
              <GridFileItem filename="file-name.png" size="2mb" />
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
    <div class="h-16 md:hidden fixed w-full bottom-0">
      <BottomNav />
    </div>
  </div>
</template>

<script lang="ts" >
import { defineComponent } from "vue";
import {
  // FolderIcon,
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
import ViewSwitcher from "./components/ViewSwitcher/ViewSwitcher.vue";

export default defineComponent({
  components: {
    Nav,
    BottomNav,
    FilePreview,
    GridFileItem,
    FolderIcon,
    StarIcon,
    DotsVerticalIcon,
    PlusCircleIcon,
    SearchIcon,
    ChevronDownIcon,
    RssIcon,
    DocumentIcon,
    ViewSwitcher,
  },

  setup() {
    // return { scrollDirection: this.scrollDirection };
  },

  methods: {
    scrollDirection(event: MouseEvent) {
      console.log(event);
    },
  },
});
</script>
