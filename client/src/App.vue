<template>
  <div class="flex flex-col h-full w-full justify-between">
    <div class="w-full h-full flex gap-14 bg-ocean-blue-light">
      <Nav />
      <main class="
          h-full
          w-full
          md:py-7
          gap-5
          md:gap-8
          flex flex-col
          px-4
          md:px-0
          border-red-500
        ">
        <header class="sticky z-10 bg-ocean-blue-light top-7">
          <div class="flex justify-between gap-4 text-ocean-blue-dark">
            <RssIcon class="w-5" />
            <div class="flex-1">
              <input class="
                  w-full
                  outline-none
                  bg-transparent
                  text-sm
                  align-baseline
                " type="" name="" id="searchField" placeholder="Ctrl + k" />
            </div>
            <div class="flex gap-5">
              <input type="file" hidden id="uploadField" @change="uploadFiles($event)" />
              <label for="uploadField" class="cursor-pointer">
                <button class="
                    pointer-events-none
                    justify-center
                    items-center
                    flex
                    h-5
                    w-5
                  ">
                  <PlusCircleIcon class="w-5" v-if="uploadPercentage === null" />
                  <div v-if="typeof uploadPercentage === 'number'" class="
                      rounded-full
                      border-2 border-ocean-blue-dark
                      text-[10px]
                      p-0.5
                    ">
                    {{ uploadPercentage }}
                  </div>
                </button>
              </label>
              <label for="searchField">
                <button>
                  <SearchIcon class="w-5" />
                </button>
              </label>
              <label>
                <button>
                  <StarIcon class="w-5" />
                </button>
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
            <div class="
                h-full
                grid
                gap-2
                grid-cols-2
                md:grid-cols-3
                xl:grid-cols-4
                2xl:grid-cols-6
                py-3
                overflow-auto
              " @scroll="(e) => scrollDirection(e)">
              <!-- GRID FILE ITEM -->
              <!-- <GridFileItem filename="file-name.png" size="2mb" /> -->
              <GridFileItem v-for="(file, index) in store.state.allFetchedFiles" :file="file" :key="index"
                :selected="selected === index" @click="() => handleGridClick(file, index)" />
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
      <div v-if="!store.state.previewStatus" class="md:block hidden"></div>
    </div>
    <BottomNav :class="directionClassName" />
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from "vue";
import {
  StarIcon,
  PlusCircleIcon,
  SearchIcon,
  ChevronDownIcon,
  RssIcon,
} from "@heroicons/vue/outline";
import { FolderIcon } from "@heroicons/vue/solid";
import "./App.css";
import Nav from "./layouts/Nav/Nav.vue";
import BottomNav from "./layouts/Nav/BottomNav.vue";
import FilePreview from "./layouts/FilePreview/FilePreview.vue";
import GridFileItem from "./components/File/GridFileItem/GridFileItem.vue";
import ViewSwitcher from "./components/ViewSwitcher/ViewSwitcher.vue";
import { throttle, upload } from "./utils";
import { useStore } from "vuex"
import { DisplayFile } from "./types"
import { RootState } from "./store/types";

const store = useStore<RootState>()
const initialScrollPosition: Ref<number> = ref(0);
const directionClassName: Ref<string> = ref("");
const scrollDirection: Function = throttle((event: Event) => {
  if (!event.target) return;
  const initialPos = initialScrollPosition.value;
  const target = event.target as Element;
  console.log("initial sc pos ", initialPos, target.scrollTop);

  const movementDifference = initialPos - target.scrollTop;
  directionClassName.value =
    movementDifference === Math.abs(movementDifference) ? "" : "hide-below";
  initialScrollPosition.value = target.scrollTop;
}, 100);
const uploadPercentage: Ref<number | null> = ref(null);
const selected: Ref<any> = ref(false);

store.dispatch("fetchAllFiles")

function handleGridClick(file: DisplayFile, index: any) {
  console.log("CALLED", { file, state: store.state.previewStatus });
  if (selected.value === index) {
    selected.value = null;
    return
  }
  store.commit("TOGGLE_PREVIEW", true)
  store.commit("UPDATE_PREVIEW_FILE", file)
  selected.value = index;
}

function uploadFiles(evt: Event) {
  const evtTarget = evt.target as HTMLInputElement;

  if (!evtTarget.files) return;
  if (evtTarget.files.length < 0) return;

  const files = Array.from(evtTarget.files);
  console.log("upload files", files);

  files.forEach(async (file: File) => {
    let formDataFile = new FormData();
    formDataFile.append("upload", file);
    await upload(formDataFile, {
      onUploadProgress: (event: ProgressEvent) => {
        if (!event.lengthComputable) return;

        const percentCompleted = Math.round(
          (event.loaded * 100) / event.total
        );

        uploadPercentage.value = percentCompleted;
        console.log(percentCompleted);
      },
    });

    uploadPercentage.value = null;
  });
  store.dispatch("fetchAllFiles")
}
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