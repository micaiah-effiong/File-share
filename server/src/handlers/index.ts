import path from "path";
import config from "../config/env";
import asyncHandler from "./async-handler";
import errorResponse from "./error-response";
import listFiles from "./list-files";
import localIp from "./local-ip";
import processRange from "./process-range";
import upload from "./upload";

export {
  asyncHandler,
  errorResponse,
  listFiles,
  localIp,
  processRange,
  upload,
};
const apiLinkPath = ["api", "files"];
export const getDownloadLink = (file: string) =>
  getHref(
    path
      .join(...apiLinkPath, "download", encodeURIComponent(file))
      .replace(/\\/g, "/")
  );
export const getStreamLink = (file: string) =>
  getHref(
    path
      .join(...apiLinkPath, "stream", encodeURIComponent(file))
      .replace(/\\/g, "/")
  );
export const getFileLink = (file: string) =>
  getHref(
    path.join(...apiLinkPath, encodeURIComponent(file)).replace(/\\/g, "/")
  );

export const getShortName = (name: string) => {
  if (name.lastIndexOf(".") > 12) {
    return `${name.substring(0, 12)}...${name.substring(
      name.lastIndexOf(".") + 1
    )}`;
  }
  return name;
};

export function convertByte(num: number): string {
  let format = ["b", "kb", "mb", "gb", "tb"],
    level;
  for (level = 0; num > 1024; level++) {
    num = num / 1024;
  }
  return `${num.toFixed(2)}${format[level]}`;
}

function getHref(url: string): string {
  console.log(config.ORIGIN);

  return new URL(url, config.ORIGIN).href;
}
