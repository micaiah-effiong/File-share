const fs = require("fs");
const mime = require("mime");
const { promises: fsPromises } = require("fs");
const path = require("path");
const appFolder = path.resolve(__dirname, "..", "files");

/**
 * @return Array of files in the file folder
 */
module.exports = async function () {
  // Create an array to hold new list
  let list = [];

  // get array of all files and folders
  let folderItemsList = await fsPromises.readdir(appFolder);

  for (let i = 0; i < folderItemsList.length; i++) {
    // file or folder name
    let _file = folderItemsList[i];
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
      let link = path.join("api", "files", _file).replace(/\\/g, "/");
      let short;

      if (_file.lastIndexOf(".") > 12) {
        short = `${_file.substring(0, 12)}...${_file.substring(
          _file.lastIndexOf(".") + 1
        )}`;
      } else {
        short = _file;
      }

      // push details to the list<Array>
      list.push({
        filename: _file,
        short,
        size: convertByte(size),
        createdAt: birthtime,
        link,
        downloadLink,
        fileType,
      });
    }
  }
  return list;
};

function convertByte(num) {
  let format = ["b", "kb", "mb", "gb", "tb"],
    level;
  for (level = 0; num > 1024; level++) {
    num = num / 1024;
  }
  return `${num.toFixed(2)}${format[level]}`;
}
