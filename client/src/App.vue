<template>
  <div className="w-full h-full flex gap-14 dark bg-ocean-blue-light">
    <Nav />
    <main className="h-full w-full py-7 gap-8 flex flex-col">
      <header className="">
        <div className="flex justify-between gap-4 text-ocean-blue-dark">
          <RssIcon class="w-5" />
          <div className="flex-1">
            <input
              className="w-full outline-none bg-transparent"
              type="search"
              name=""
              id=""
            />
          </div>
          <div className="flex gap-5">
            <PlusCircleIcon class="w-5" />
            <SearchIcon class="w-5" />
            <StarIcon class="w-5" />
          </div>
        </div>
        <div className="py-5">
          <div className="cut"></div>
        </div>
        <nav>
          <div className="flex justify-between text-ocean-blue-dark">
            <div className="flex gap-6 flex-1">
              <div className="flex gap-2 shadow-md p-2 rounded-lg bg-white">
                <FolderIcon class="w-6 text-ocean-blue-normal" />
                <ChevronDownIcon class="w-3" />
              </div>
              <button>Recent Files</button>
            </div>

            <div className="flex items-center">
              <div
                className="flex justify-between p-2 h-auto rounded-md bottom-2 border-black gap-5 bg-ocean-blue-accent shadow-ms shadow-inner"
              >
                <button>
                  <MenuIcon class="text-xs w-5" />
                </button>
                <button className="shadow-md rounded-sm bg-white p-0.5">
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
            className="bg-white w-4/12 rounded-lg shadow-sm mono:bg-ash-normal mono:text-ash-accent mono:hover:bg-ash-secondary mono:hover:transition-colors transition-colors"
          >
            <div className="grid w-full p-3 rounded-md">
              <div>
                <div className="flex justify-between py-1">
                  <button>
                    <StarIcon class="w-5 text-ocean-blue-secondary" />
                  </button>
                  <button>
                    <DotsVerticalIcon
                      class="w-5 mono:text-ash-light text-ocean-blue-secondary"
                    />
                  </button>
                </div>
                <div className="grid gap-3 py-5 justify-center text-center">
                  <div className="text-[4rem] flex justify-center">
                    <span>
                      <DocumentIcon class="h-16 text-ocean-blue-secondary" />
                    </span>
                  </div>
                  <div
                    className="text-[0.8rem] text-ocean-blue-dark font-semibold"
                  >
                    file-name.png
                  </div>
                </div>
              </div>

              <!-- <div className="cut"></div> -->

              <div className="flex pt-3 pb-2 cut justify-between items-center">
                <div className="uppercase text-xs text-ocean-blue-dark">
                  2mb
                </div>
                <div>
                  <div
                    className="outline-1 outline-white bg-red-500 w-6 h-6 rounded-md flex justify-center items-center text-sm font-semibold text-white p-1"
                  >
                    <span>O</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- <div className="grid p-2 gap-1 h-[10rem]">
          <div className="bg-[#81c5f6]">secondary</div>
          <div className="bg-[#e8f0f7]">accent</div>
          <div className="bg-[#078dee]">normal</div>
          <div className="bg-[#4d788f]">dark</div>
          <div className="bg-[#f5f9fd]">bg light</div>
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