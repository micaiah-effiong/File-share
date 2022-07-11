import { createStore } from "vuex";
import { DisplayFile } from "../types";
import { getFiles } from "../utils";
import { FileViewType, RootState } from "./types";

const store = createStore<RootState>({
  /* state, actions, mutations */
  state: {
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
    fileViewType: "GRID",
  },
  mutations: {
    UPDATE_PREVIEW_FILE(state, payload: DisplayFile) {
      state.previewFileInformation = payload;
    },
    TOGGLE_PREVIEW(state, payload: boolean) {
      state.previewStatus = payload;
    },
    SET_FETCHED_FILES(state, payload: DisplayFile[]) {
      state.allFetchedFiles = payload;
    },
    TOGGLE_FILE_VIEW(state, payload: `${FileViewType}`) {
      state.fileViewType = payload;
    },
  },

  actions: {
    async fetchAllFiles(context) {
      const files = await getFiles();
      context.commit("SET_FETCHED_FILES", files);
      console.log("files =>", files);
    },

    switchFileView(context, payload: `${FileViewType}`) {
      context.commit("TOGGLE_FILE_VIEW", payload);
    },
  },
});

export default store;
