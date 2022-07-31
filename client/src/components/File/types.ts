import { FileViewTypesList } from "../../store/types";
import { DisplayFile } from "../../types";

export type FileItemProps = {
	file: DisplayFile;
	isSelected?: boolean;
	viewType: FileViewTypesList;
};
