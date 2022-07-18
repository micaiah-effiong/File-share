import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { DisplayFile } from "../types";
import { getFiles } from "../utils";
import {
  FileViewTypes,
  FileViewTypesList,
  RootActions,
  RootState,
} from "./types";

export const useMainStore = defineStore<any, RootState, {}, RootActions>(
  "mainStore",
  {
    state: (): RootState => ({
      previewFileInformation: {
        filename: "",
        size: "",
        short: "",
        createdAt: "",
        link: "",
        downloadLink: "",
        streamLink: "",
        fileType: "",
      },
      allFetchedFiles: [],
      previewStatus: false,
      fileViewType: useStorage<FileViewTypesList>(
        "fileViewType",
        FileViewTypes.GRID
      ),
    }),
    actions: {
      async fetchAllFiles() {
        const files = await getFiles();
        this.allFetchedFiles = files;
        console.log("files =>", files);
      },

      switchFileView(payload: FileViewTypesList) {
        this.fileViewType = payload;
      },

      // mutations
      updatePreviewFile(payload: DisplayFile) {
        this.previewFileInformation = payload;
      },
      togglePreview(payload: boolean) {
        this.previewStatus = payload;
      },
      setFetchedFiles(payload: DisplayFile[]) {
        this.allFetchedFiles = payload;
      },
      toggleFileView(payload: FileViewTypesList) {
        this.fileViewType = payload;
      },
    },
  }
);

function useStorage<T>(key: string, stateDate: T) {
  const storedState = read(key);

  const data = ref(storedState ?? stateDate);
  write(key, data.value);

  watch(
    () => {
      console.log("reading...");
      return data.value;
    },

    (newState, oldState) => {
      write(key, newState);
      data.value = newState;
      console.log("writing...", { newState, oldState });
    }
  );

  console.log({ storedState, state: data.value });

  function read(key: string) {
    console.log("reading()...");
    const storageData = localStorage.getItem(key);
    return JSON.parse(JSON.stringify(storageData));
  }

  function write(key: string, payload: any) {
    localStorage.setItem(
      key,
      typeof payload === "object" ? JSON.stringify(payload) : payload.toString()
    );
    console.log("writing()...", { key, payload });
  }

  return data;
}
