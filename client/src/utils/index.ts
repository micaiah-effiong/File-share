import axios, { AxiosRequestConfig } from "axios";
import { DisplayFile, UploadDetailsTracker, UploadFilesProgressDetails } from "../types";

export function debounce(cb: Function, delay: number): Function {
	let timeout: number;
	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			cb(...args);
		}, delay);
	};
}

export function throttle(cb: Function, delay: number): Function {
	let shouldWait: boolean = false;
	return (...args: any[]): void => {
		if (shouldWait) return;

		cb(...args);
		shouldWait = true;

		setTimeout(() => {
			shouldWait = false;
		}, delay);
	};
}

const API_ORIGIN = import.meta.env.VITE_EXTERNAL_API || "";

export async function getFiles(): Promise<DisplayFile[]> {
	const res = await axios.get(`${API_ORIGIN}/api/files`);
	return res.data.data;
}

export async function removeFile(fileId: string) {
	const res = await axios.delete(`${API_ORIGIN}/api/files/${fileId}`);
	return res.data;
}

export async function uploadService(data: any, options: AxiosRequestConfig = {}): Promise<any> {
	options.headers = { ...options.headers, "Content-Type": "multipart/form-data" };
	const res = await axios.post(`${API_ORIGIN}/api/files`, data, options);

	return res.data;
}

export async function uploadFiles(_files: FileList, cb: (uploadDetails: UploadFilesProgressDetails) => void) {
	const uploadTracker: UploadDetailsTracker = {};

	const files = Array.from(_files);
	console.log("upload files", files);
	let completedUploads: number = 0;
	const uploadFilesPromises = files.map(async (file: File) => {
		let formDataFile = new FormData();
		formDataFile.append("upload", file);
		const abortController = new AbortController();
		uploadTracker[file.name] = { progress: 0, abortController };

		return uploadService(formDataFile, {
			signal: abortController.signal,
			onUploadProgress: (event: ProgressEvent) => {
				if (!event.lengthComputable) return;

				const uploadProgress: number = (event.loaded * 100) / event.total;
				uploadTracker[file.name].progress = Math.round(uploadProgress);

				const scores: number[] = Object.values(uploadTracker).map((tracker) => tracker.progress);
				const percentCompleted = Math.floor(
					scores.reduce((prevScore: number, currentScore: number) => {
						return prevScore + currentScore;
					}, 0) / scores.length
				);
				completedUploads = scores.filter((score) => score === 100).length;

				cb({
					percentCompleted,
					completedUploads,
					totalUploads: files.length,
					uploadingFilesDetails: computeUploadingFilesDetails(uploadTracker),
				});
				// console.log(percentCompleted, scores, scores.length);
			},
		});
	});

	await Promise.all(uploadFilesPromises);
	cb({
		percentCompleted: null,
		completedUploads,
		totalUploads: files.length,
		uploadingFilesDetails: computeUploadingFilesDetails(uploadTracker),
	});
}

function computeUploadingFilesDetails(uploadingFilesObj: UploadDetailsTracker) {
	return Object.keys(uploadingFilesObj).map((key) => ({
		filename: key,
		progress: uploadingFilesObj[key].progress,
		abortController: uploadingFilesObj[key].abortController,
	}));
}
