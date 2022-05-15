<template>
  <aside
    class="h-full max-w-5/12 w-5/12 py-7 bg-white hidden md:block"
    v-if="!closed"
    v-bind="$attrs"
  >
    <div class="flex flex-col h-full">
      <header class="px-3">
        <div class="flex justify-between text-ocean-blue-dark">
          <div class="flex gap-2">
            <DocumentTextIcon class="w-5" />
            <span>File Preview</span>
          </div>
          <button class="w-5" @click="openPreview"><XIcon /></button>
        </div>
        <div class="py-5">
          <div class="cut"></div>
        </div>
      </header>
      <main class="h-full grid overflow-auto">
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
              <div class="grid gap-1">
                <div class="flex gap-3">
                  <AvatarVue label="Olive Silver" />
                  <div>Olive Silver</div>
                </div>
                <div class="flex gap-3">
                  <AvatarVue label="Tom Shedy" />
                  <div>Tom Shedy</div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <div class="border-t self-end mt-7 py-5 px-10">
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
      </main>
    </div>
  </aside>
  <div v-if="closed"></div>
</template>

<script lang="ts" >
import { defineComponent, PropType, ref } from "vue";
import { DocumentIcon } from "@heroicons/vue/solid";
import {
  DocumentTextIcon,
  ExternalLinkIcon,
  PencilIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/vue/outline";
import AvatarVue from "../../components/Avatar/Avatar.vue";

export default defineComponent({
  components: {
    DocumentTextIcon,
    ExternalLinkIcon,
    PencilIcon,
    TrashIcon,
    DocumentIcon,
    XIcon,
    AvatarVue,
  },
  props: {
    isClosed: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  setup(props) {
    // const closed = toRef(props, "isClosed");
    const closed = ref(false);

    return { closed };
  },
  methods: {
    openPreview() {
      this.closed = !this.closed;
    },
  },
});
</script>
