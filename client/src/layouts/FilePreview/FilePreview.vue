<template>
  <aside
    class="h-full max-w-5/12 w-5/12 py-7 bg-white hidden md:block"
    v-if="showFilePreview"
    v-bind="$attrs"
  >
    <div class="flex flex-col h-full">
      <header class="px-3">
        <div class="flex justify-between text-ocean-blue-dark">
          <div class="flex gap-2">
            <DocumentTextIcon class="w-5" />
            <span>File Preview</span>
          </div>
          <button class="w-5" @click="closePreview"><XIcon /></button>
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
                  {{ fileInformation?.name }}
                </div>
                <div class="text-xs">{{ fileInformation?.size }}</div>
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
            <ActionBtn label="Share">
              <ExternalLinkIcon />
            </ActionBtn>
            <ActionBtn label="Edit">
              <PencilIcon />
            </ActionBtn>
            <ActionBtn label="Delete">
              <TrashIcon />
            </ActionBtn>
          </div>
        </div>
      </main>
    </div>
  </aside>
</template>

<script lang="ts" >
import { defineComponent, toRefs } from "vue";
import { DocumentIcon } from "@heroicons/vue/solid";
import {
  DocumentTextIcon,
  ExternalLinkIcon,
  PencilIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/vue/outline";
import AvatarVue from "../../components/Avatar/Avatar.vue";
import ActionBtn from "../../components/Buttons/ActionBtn.vue";

export default defineComponent({
  components: {
    DocumentTextIcon,
    ExternalLinkIcon,
    PencilIcon,
    TrashIcon,
    DocumentIcon,
    XIcon,
    AvatarVue,
    ActionBtn,
  },
  props: {
    showFilePreview: {
      type: Boolean,
      required: true,
    },
    setShowFilePreview: {
      type: Function,
      required: true,
    },
    fileInformation: {
      type: Object,
    },
  },
  setup(props) {
    console.log("UPDATE", props.showFilePreview);

    const { showFilePreview, fileInformation } = toRefs(props);
    return { showFilePreview, fileInformation };
  },
  methods: {
    closePreview() {
      this.setShowFilePreview(false);
    },
  },
});
</script>
