import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { DisplayFile, Nullable } from "../types";
import { getFiles } from "../utils";
import { FileViewTypes, FileViewTypesList, RootActions, RootState } from "./types";

export const useMainStore = defineStore<any, RootState, {}, RootActions>("mainStore", {
	state: (): RootState => ({
		previewFileInformation: null,
		filesOnDisplay: [],
		allFetchedFiles: [],
		previewStatus: false,
		fileViewType: useStorage<FileViewTypesList>("fileViewType", FileViewTypes.GRID),
		fileFilters: {
			search: "",
			fileTypes: [],
		},
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
		setFileFilters(key, value) {
			this.fileFilters[key] = value;
		},
		applyFilters() {
			const allFiles = this.allFetchedFiles;
			const foundAfterFilter = filterFileByType(this.fileFilters.fileTypes, allFiles);
			const searchFilesFound = searchFile(this.fileFilters.search, foundAfterFilter);
			console.log({ searchFilesFound });

			this.setFilesOnDisplay(searchFilesFound);
		},
		removeFileOnDisplay(file) {
			const displayFiles = this.filesOnDisplay;
			const fileId: string = typeof file === "string" ? file : file.id;

			if (typeof file === "string") {
				for (let index = 0; index < displayFiles.length; index++) {
					if (displayFiles[index].id === file) {
						displayFiles.splice(index, 1);
						break;
					}
				}
			} else {
				const files = new Set(displayFiles);
				files.delete(file);
				this.setFilesOnDisplay(Array.from(files));
			}

			if (this.previewFileInformation && fileId === this.previewFileInformation.id) {
				this.updatePreviewFile(null);
			}
		},
	},
});

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
		localStorage.setItem(key, typeof payload === "object" ? JSON.stringify(payload) : payload.toString());
	}

	return data;
}

function searchFile(name: string, allFiles: DisplayFile[]) {
	if (!name) return allFiles;

	const searchRx = new RegExp(name, "i");
	const matchedFiles = allFiles.filter((file: DisplayFile) => searchRx.test(file.filename));

	return matchedFiles;
}

function filterFileByType(fileTypesSelected: string[], allFiles: DisplayFile[]) {
	if (fileTypesSelected.length === 0) return allFiles;

	const mainTypeForSelectedFiles = fileTypesSelected.map((type) => type.split("/")[0]);

	return allFiles.filter((file) => {
		const mainFileType = file.fileType.split("/")[0];
		return mainTypeForSelectedFiles.includes(mainFileType);
	});
}
