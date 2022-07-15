import axios from "axios";
import { DisplayFile } from "../types";

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

export async function uploadService(
  data: any,
  options: {
    onUploadProgress?: (progressEvent: any) => void;
    [key: string]: any;
  } = {}
): Promise<any> {
  options.headers = {
    "Content-Type": "multipart/form-data",
  };
  const res = await axios.post(`${API_ORIGIN}/api/files`, data, options);
  return res.data;
}

export async function uploadFiles(
  evt: Event,
  cb: (num: number | null) => void
) {
  const evtTarget = evt.target as HTMLInputElement;

  if (!evtTarget.files) return;
  if (evtTarget.files.length < 0) return;

  const uploadTracker: Record<string, number> = {};

  const files = Array.from(evtTarget.files);
  console.log("upload files", files);

  const uploadFilesPromises = files.map(async (file: File) => {
    let formDataFile = new FormData();
    formDataFile.append("upload", file);
    uploadTracker[file.name] = 0;

    return uploadService(formDataFile, {
      onUploadProgress: (event: ProgressEvent) => {
        if (!event.lengthComputable) return;

        const uploadProgress: number = (event.loaded * 100) / event.total;
        uploadTracker[file.name] = Math.round(uploadProgress);

        const scores: number[] = Object.values(uploadTracker);
        const percentCompleted = Math.floor(
          scores.reduce((prevScore: number, currentScore: number) => {
            return prevScore + currentScore;
          }, 0) / scores.length
        );

        cb(percentCompleted);
        // console.log(percentCompleted, scores, scores.length);
      },
    });
  });

  await Promise.all(uploadFilesPromises);

  alert("Upload complete");
  cb(null);
}
