<template>
  <div class="flex flex-col h-full w-full justify-between">
    <div class="w-full h-full flex gap-14 bg-ocean-blue-light">
      <Nav />
      <main
        class="
          h-full
          w-full
          md:py-7
          gap-5
          md:gap-8
          flex flex-col
          px-4
          md:px-0
          border-red-500
        "
      >
        <header class="sticky z-10 bg-ocean-blue-light top-7">
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
        <main class="max-h-[calc(100%-87px)] md:max-h-[calc(100%-105px)]">
          <div class="h-full outer relative">
            <div
              class="
                h-full
                grid
                gap-3
                grid-cols-2
                md:grid-cols-3
                xl:grid-cols-4
                2xl:grid-cols-6
                py-3
                overflow-auto
              "
              @scroll="(e) => scrollDirection(e)"
            >
              <!-- GRID FILE ITEM -->
              <!-- <GridFileItem filename="file-name.png" size="2mb" /> -->
              <GridFileItem
                v-for="(file, index) in files"
                :filename="file.name"
                :size="file.size"
                :key="index"
                :selected="selected === index"
                @click="() => handleGridClick(file, index)"
              />
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

      <FilePreview
        :showFilePreview="showFilePreview"
        :setShowFilePreview="toggleFilePreview"
        :fileInformation="previewFileInfo"
      />
      <div v-if="!showFilePreview" class="md:block hidden"></div>
    </div>
    <BottomNav :class="directionClassName" />
  </div>
</template>

<script lang="ts" >
import { defineComponent, Ref, ref } from "vue";
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
import { debounce, throttle } from "./utils";

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
    const showFilePreview: Ref<boolean> = ref(false);
    const previewFileInfo: Ref<any> = ref({});
    const initialScrollPosition: Ref<number> = ref(0);
    const directionClassName: Ref<string> = ref("");
    const scrollDirection: Function = throttle((event: Event) => {
      if (!event.target) return;
      const initialPos = initialScrollPosition.value;
      const target = event.target as Element;
      console.log("initial sc pos ", initialPos, target.scrollTop);

      const movementDifference = initialPos - target.scrollTop;
      // const direction =
      //   movementDifference === Math.abs(movementDifference) ? "Up" : "Down";
      directionClassName.value =
        movementDifference === Math.abs(movementDifference) ? "" : "hide-below";

      initialScrollPosition.value = target.scrollTop;
    }, 100);

    const files: Array<{ name: string; size: string }> = [
      { name: "file", size: "3mb" },
      { name: "file.png", size: "3mb" },
      { name: "file.jpg", size: "3kb" },
      { name: "file.mp3", size: "13mb" },
      { name: "file", size: "3mb" },
      { name: "file", size: "3mb" },
      { name: "file", size: "3mb" },
      { name: "file", size: "3mb" },
      { name: "file", size: "3mb" },
      { name: "file", size: "3mb" },
      { name: "file", size: "3mb" },
    ];

    const selected: Ref<any> = ref(false);

    return {
      selected,
      previewFileInfo,
      scrollDirection,
      directionClassName,
      showFilePreview,
      files,
    };
  },

  methods: {
    getContentScrollPositionBeforeScroll(event: Event) {
      console.log(event.target);
    },

    toggleFilePreview(display: boolean, option: any) {
      this.showFilePreview = display;
      this.previewFileInfo = option.file;
      console.log("CALLED", { display, state: this.showFilePreview });
    },

    handleGridClick(file: any, index: any) {
      this.toggleFilePreview(true, { file });
      this.selected = index;
    },
  },
});
</script>

<style scoped>
.outer::after {
  content: "";
  box-shadow: inset 0px 20px 8px -10px #f5f9fdc7,
    inset 0px -20px 8px -10px #f5f9fdc7;

  height: 100%;
  position: absolute;
  width: 100%;
  left: 0px;
  top: 0px;
  pointer-events: none;
}
</style>