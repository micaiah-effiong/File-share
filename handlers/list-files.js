const fs = require("fs");
const { promises: fsPromises } = require("fs");
const util = require("util");
const path = require("path");
const appFolder = path.resolve(__dirname, "..", "files");
console.log(appFolder);

module.exports = async function () {
  let folderItemsList = await fsPromises.readdir(appFolder);

  return await folderItemsList.filter(async (filePath) => {
    let fullFilePath = path.resolve(appFolder, filePath);
    return !!(await fsPromises.stat(fullFilePath)).isFile();
  });
};
