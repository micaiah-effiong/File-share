const fs = require("fs");
const mime = require("mime");
const { promises: fsPromises } = require("fs");
const path = require("path");
const appFolder = path.resolve(__dirname, "..", "files");
console.log(appFolder);

/*
 * @return Array of files in the file folder
 */
module.exports = async function () {
  let list = []; // array to hold new list
  let folderItemsList = await fsPromises.readdir(appFolder); // return and array of all files and folders

  for (let i = 0; i < folderItemsList.length; i++) {
    let _file = folderItemsList[i]; // file or folder name
    let fullFilePath = path.resolve(appFolder, _file);

    // check if the current item is an actual file
    if (!!(await fsPromises.stat(fullFilePath)).isFile()) {
      let fileDetails = await fsPromises.stat(fullFilePath); // get file stats

      // create file details
      let { size, birthtime } = fileDetails;
      let type = mime.lookup(_file);
      let link = path.join("/files", _file);
      let details = { size, "created at": birthtime, link, type };

      // push details to the list<Array>
      list.push({
        filename: _file,
        details,
      });
    }
  }
  return list;
};
