import { DisplayFile, Nullable } from "../types";

export interface RootState {
  previewFileInformation: Nullable<DisplayFile>;
  previewStatus: boolean;
  allFetchedFiles: DisplayFile[];
  filesOnDisplay: DisplayFile[];
  fileViewType: FileViewTypesList;
}
export interface RootActions {
  fetchAllFiles: () => Promise<DisplayFile[]>;
  switchFileView: (payload: FileViewTypesList) => void;
  updatePreviewFile: (payload: Nullable<DisplayFile>) => void;
  togglePreview: (payload: boolean) => void;
  setFetchedFiles: (payload: DisplayFile[]) => void;
  setFilesOnDisplay: (payload: DisplayFile[]) => void;
  toggleFileView: (payload: FileViewTypesList) => void;
  searchFile: (name: string) => DisplayFile[];
}

export enum FileViewTypes {
  "GRID" = "GRID",
  "LIST" = "LIST",
  "SEMI_LIST" = "SEMI_LIST",
}

export type FileViewTypesList = `${FileViewTypes}`;
