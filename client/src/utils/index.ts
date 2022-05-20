import axios from "redaxios";

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
  return (...args: any[]) => {
    if (shouldWait) return;

    cb(...args);
    shouldWait = true;

    setTimeout(() => {
      shouldWait = false;
    }, delay);
  };
}

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
  const res = await axios.get("http://localhost:3300/api/files");
  return res.data.data;
}
