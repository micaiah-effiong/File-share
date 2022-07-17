import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { DisplayFile } from "../types";
import { getFiles } from "../utils";
import { FileViewTypesList, RootActions, RootState } from "./types";

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
      fileViewType: useStorage<FileViewTypesList>("fileViewType", "GRID"),
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
