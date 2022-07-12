<template>
  <div class="flex flex-col h-screen w-full justify-between">
    <div class="w-full h-full flex gap-14 bg-ocean-blue-light">
      <SideNav />
      <main
        class="h-full w-full md:py-7 gap-5 md:gap-8 flex flex-col px-2 md:px-0"
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
              <input
                type="file"
                multiple
                hidden
                id="uploadField"
                @change="uploadFiles($event)"
              />
              <label for="uploadField" class="cursor-pointer">
                <button
                  class="
                    pointer-events-none
                    justify-center
                    items-center
                    flex
                    h-5
                    w-5
                  "
                >
                  <PlusCircleIcon
                    class="w-5"
                    v-if="uploadPercentage === null"
                  />
                  <div
                    v-if="typeof uploadPercentage === 'number'"
                    class="
                      rounded-full
                      border-2 border-ocean-blue-dark
                      text-[10px]
                      p-0.5
                    "
                  >
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
          <nav class="hidden md:block py-2 md:py-0">
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
        <main class="max-h-[calc(100%-90px)] md:max-h-[calc(100%-105px)">
          <div class="h-full outer relative">
            <AllFilesMenu
              :files="store.state.allFetchedFiles"
              :handle-scroll="scrollDirection"
            >
            </AllFilesMenu>
          </div>
        </main>
      </main>

      <FilePreview />
      <div v-if="!store.state.previewStatus" class="md:block hidden"></div>
    </div>
    <ButtomNav :should-hide="shouldHideButtomNav" />
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
import { SideNav, ButtomNav } from "./layouts/Nav";
import FilePreview from "./layouts/FilePreview/FilePreview.vue";
import ViewSwitcher from "./components/ViewSwitcher/ViewSwitcher.vue";
import AllFilesMenu from "./layouts/AllFilesMenu/AllFilesMenu.vue";
import { throttle, upload } from "./utils";
import { useStore } from "vuex";
import { RootState } from "./store/types";

const store = useStore<RootState>();
const initialScrollPosition: Ref<number> = ref(0);
const shouldHideButtomNav: Ref<boolean> = ref(false);
const scrollDirection: Function = throttle((event: Event) => {
  if (!event.target) return;
  const initialPos = initialScrollPosition.value;
  const target = event.target as Element;
  console.log("initial sc pos ", initialPos, target.scrollTop);

  const movementDifference = initialPos - target.scrollTop;
  shouldHideButtomNav.value =
    movementDifference !== Math.abs(movementDifference);
  initialScrollPosition.value = target.scrollTop;
}, 100);
const uploadPercentage: Ref<number | null> = ref(null);

store.dispatch("fetchAllFiles");

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

        const percentCompleted = Math.round((event.loaded * 100) / event.total);

        uploadPercentage.value = percentCompleted;
        console.log(percentCompleted);
      },
    });
    alert("Upload complete");
    uploadPercentage.value = null;
  });
  store.dispatch("fetchAllFiles");
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
