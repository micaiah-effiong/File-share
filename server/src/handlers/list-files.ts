import mime from "mime";
import { promises as fsPromises } from "fs";
import path from "path";
import { FileData } from "../types";
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
      let fileType = mime.lookup(_file);
      let downloadLink = path
        .join("api", "files", "download", encodeURIComponent(_file))
        .replace(/\\/g, "/");
      let streamLink = path
        .join("api", "files", "stream", encodeURIComponent(_file))
        .replace(/\\/g, "/");
      let link: string = path.join("api", "files", _file).replace(/\\/g, "/");
      let short;

      if (_file.lastIndexOf(".") > 12) {
        short = `${_file.substring(0, 12)}...${_file.substring(
          _file.lastIndexOf(".") + 1
        )}`;
      } else {
        short = _file;
      }

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

function convertByte(num: number): string {
  let format = ["b", "kb", "mb", "gb", "tb"],
    level;
  for (level = 0; num > 1024; level++) {
    num = num / 1024;
  }
  return `${num.toFixed(2)}${format[level]}`;
}
