export type DisplayFile = {
	id: string;
	filename: string;
	size: string;
	short: string;
	createdAt: string;
	link: string;
	downloadLink: string;
	streamLink: string;
	fileType: string;
};
export type Nullable<T> = T | null;

export type UploadFilesProgressDetails = {
	percentCompleted: number | null;
	completedUploads: number;
	totalUploads: number;
	uploadingFilesDetails: Array<{ filename: string; progress: number }>;
};
