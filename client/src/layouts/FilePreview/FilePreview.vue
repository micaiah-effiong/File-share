<template>
  <aside className="h-full max-w-5/12 w-5/12 py-7 bg-white">
    <div className="grid h-full ">
      <header className="px-3">
        <div className="flex gap-2 text-ocean-blue-dark">
          <DocumentTextIcon class="w-5" />
          <span>File Preview</span>
        </div>
        <div className="py-5">
          <div className="cut"></div>
        </div>
      </header>
      <main className="h-full overflow-auto">
        <main className="px-10 text-sm text-ocean-blue-dark">
          <div className="grid gap-7">
            <div className="grid gap-3">
              <div className="flex justify-center">
                <DocumentIcon class="h-48 text-ocean-blue-secondary" />
              </div>
              <div className="grid gap-2">
                <div className="font-semibold break-all">
                  users-file-screenshots-image-media-somefile.png
                </div>
                <div className="text-xs">2.5GB</div>
              </div>
            </div>
            <div className="cut"></div>
            <div className="break-words grid gap-2">
              <div className="font-semibold">Description</div>
              <div className="text-xs leading-5">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
                tempus suscipit dolor tincidunt gravida. Praesent ac rutrum
                massa. Cras vestibulum magna a tortor varius, nec interdum dui
                dapibus.
              </div>
            </div>
            <div className="cut"></div>
            <div className="grid gap-2">
              <div className="font-semibold">Shared with:</div>
              <div className="grid">
                <div className="flex gap-3 items-center">
                  <div
                    className="outline-1 outline-white bg-red-500 w-6 h-6 rounded-md flex justify-center items-center text-sm font-semibold text-white p-1 "
                  >
                    <span>S</span>
                  </div>
                  <div>Olive Silver</div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div className="border-t mt-7 py-5 px-10">
          <div
            className="flex justify-between text-xs text-ocean-blue-dark gap-3"
          >
            <div className="grid gap-3 justify-items-center">
              <div
                className="w-6 text-white bg-ocean-blue-normal rounded-md p-1"
              >
                <ExternalLinkIcon />
              </div>
              <div>Share</div>
            </div>
            <div className="grid gap-3 justify-items-center">
              <div
                className="w-6 text-white bg-ocean-blue-normal rounded-md p-1"
              >
                <PencilIcon />
              </div>
              <div>Edit</div>
            </div>
            <div className="grid gap-3 justify-items-center">
              <div
                className="w-6 text-white bg-ocean-blue-normal rounded-md p-1"
              >
                <TrashIcon />
              </div>
              <div>Delete</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </aside>
</template>

<script lang="ts" >
import { defineComponent } from "vue";
import { DocumentIcon } from "@heroicons/vue/solid";
import {
  DocumentTextIcon,
  ExternalLinkIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/vue/outline";

export default defineComponent({
  components: {
    DocumentTextIcon,
    ExternalLinkIcon,
    PencilIcon,
    TrashIcon,
    DocumentIcon,
  },
});
</script>
