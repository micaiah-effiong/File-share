import { RemovableRef } from "@vueuse/core";
import { DisplayFile } from "../types";

export interface RootState {
  previewFileInformation: DisplayFile;
  previewStatus: boolean;
  allFetchedFiles: Array<DisplayFile>;
  fileViewType: RemovableRef<FileViewTypesList>;
}
export interface RootActions {
  fetchAllFiles: () => void;
  switchFileView: (payload: FileViewTypesList) => void;
  updatePreviewFile: (payload: DisplayFile) => void;
  togglePreview: (payload: boolean) => void;
  setFetchedFiles: (payload: DisplayFile[]) => void;
  toggleFileView(payload: FileViewTypesList): void;
}

export enum FileViewTypes {
  "GRID" = "GRID",
  "LIST" = "LIST",
  "SEMI_LIST" = "SEMI_LIST",
}

export type FileViewTypesList = `${FileViewTypes}`;
