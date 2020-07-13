const fs = require("fs");
const { promises: fsPromises } = require("fs");
const path = require("path");
const appFolder = path.resolve(__dirname, "..", "files");
console.log(appFolder);

module.exports = async function () {
  let list = [];
  let folderItemsList = await fsPromises.readdir(appFolder);
  for (let i = 0; i < folderItemsList.length; i++) {
    let filePath = folderItemsList[i];
    let fullFilePath = path.resolve(appFolder, filePath);
    if (!!(await fsPromises.stat(fullFilePath)).isFile()) {
      let fileDetails = await fsPromises.stat(fullFilePath);
      list.push({ filename: filePath, details: fileDetails });
    }
  }
  return list;
};
