import { DisplayFile } from "../types";

export interface RootState {
  previewFileInformation: DisplayFile;
  previewStatus: boolean;
  allFetchedFiles: Array<DisplayFile>;
}
