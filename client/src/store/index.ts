import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { DisplayFile, Nullable } from "../types";
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
        id: "",
      },
      filesOnDisplay: [],
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
        return files;
      },
      switchFileView(payload: FileViewTypesList) {
        this.fileViewType = payload;
      },
      updatePreviewFile(payload: Nullable<DisplayFile>) {
        this.previewFileInformation = payload;
      },
      togglePreview(payload: boolean) {
        this.previewStatus = payload;
      },
      setFetchedFiles(payload: DisplayFile[]) {
        this.allFetchedFiles = payload;
      },
      setFilesOnDisplay(payload: DisplayFile[]) {
        this.filesOnDisplay = payload;
      },
      toggleFileView(payload: FileViewTypesList) {
        this.fileViewType = payload;
      },
      searchFile(name: string) {
        if (!name) return this.allFetchedFiles;

        const searchRx = new RegExp(name, "i");
        const matchedFiles = this.allFetchedFiles.filter((file: DisplayFile) =>
          searchRx.test(file.filename)
        );

        return matchedFiles;
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
      return data.value;
    },

    (newState, oldState) => {
      write(key, newState);
      data.value = newState;
    }
  );

  console.log({ storedState, state: data.value });

  function read(key: string) {
    const storageData = localStorage.getItem(key);
    return JSON.parse(JSON.stringify(storageData));
  }

  function write(key: string, payload: any) {
    localStorage.setItem(
      key,
      typeof payload === "object" ? JSON.stringify(payload) : payload.toString()
    );
  }

  return data;
}
