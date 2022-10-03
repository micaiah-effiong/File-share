import path from "path";
import config from "../config/env";
export { default as asyncHandler } from "./async-handler";
export { default as errorResponse } from "./error-response";
export { default as listFiles } from "./list-files";
export { default as localIp } from "./local-ip";
export { default as processRange } from "./process-range";
export { default as upload } from "./upload";

export { Logger } from "./logger";

const apiLinkPath = ["api", "files"];
export const getDownloadLink = (file: string) =>
	getHref(path.join(...apiLinkPath, "download", encodeURIComponent(file)).replace(/\\/g, "/"));
export const getStreamLink = (file: string) =>
	getHref(path.join(...apiLinkPath, "stream", encodeURIComponent(file)).replace(/\\/g, "/"));
export const getFileLink = (file: string) =>
	getHref(path.join(...apiLinkPath, encodeURIComponent(file)).replace(/\\/g, "/"));

export const getShortName = (name: string) => {
	if (name.lastIndexOf(".") > 12) {
		return `${name.substring(0, 12)}...${name.substring(name.lastIndexOf(".") + 1)}`;
	}
	return name;
};

export function convertByte(num: number): string {
	let format = ["b", "kb", "mb", "gb", "tb"];
	let level;

	for (level = 0; num > 1024; level++) {
		num = num / 1024;
	}

	return `${num.toFixed(2)}${format[level]}`;
}

function getHref(url: string): string {
	return new URL(url, config.ORIGIN).href;
}
