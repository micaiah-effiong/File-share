import axios from "axios";

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

export async function getFiles(): Promise<
  {
    filename: string;
    size: string;
    short: string;
    createdAt: string;
    link: string;
    downloadLink: string;
    streamLink: string;
    fileType: string;
  }[]
> {
  const res = await axios.get(`${API_ORIGIN}/api/files`);
  return res.data.data;
}

export async function upload(
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
