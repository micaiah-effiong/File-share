import mime from "mime";
import { promises as fsPromises } from "fs";
import path from "path";
import { FileData } from "../types";
import { convertByte, getDownloadLink, getFileLink, getShortName, getStreamLink } from ".";
const appFolder = path.resolve(__dirname, "..", "files");

/**
 * @return Array of files in the file folder
 */
export default async function (): Promise<FileData[]> {
	// Create an array to hold new list
	let list: FileData[] = new Array();

	// get array of all files and folders
	let folderItemsList = await fsPromises.readdir(appFolder);

	for (let i = 0; i < folderItemsList.length; i++) {
		// file or folder name
		let _file: string = folderItemsList[i];
		let fullFilePath = path.resolve(appFolder, _file);

		// check if the current item is an actual file
		if (!!(await fsPromises.stat(fullFilePath)).isFile()) {
			// get file stats
			let fileDetails = await fsPromises.stat(fullFilePath);

			// create file details
			let { size, birthtime } = fileDetails;
			let fileType = mime.getType(_file) || "application/octet-stream";
			let downloadLink = getDownloadLink(_file);
			let streamLink = getStreamLink(_file);
			let link: string = getFileLink(_file);
			let short: string = getShortName(_file);

			const fileData: FileData = {
				filename: _file,
				short: short,
				size: convertByte(size),
				createdAt: birthtime,
				link,
				downloadLink,
				streamLink,
				fileType,
			};

			// push details to the list<Array>
			list.push(fileData);
		}
	}
	return list;
}
