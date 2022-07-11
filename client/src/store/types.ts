import { DisplayFile } from "../types";

export interface RootState {
  previewFileInformation: DisplayFile;
  previewStatus: boolean;
  allFetchedFiles: Array<DisplayFile>;
  fileViewType: `${FileViewType}`;
}

export enum FileViewType {
  "GRID" = "GRID",
  "LIST" = "LIST",
  "SEMI_LIST" = "SEMI_LIST",
}
