const fileList = require("../handlers/list-files");
fileList().then(console.log);
module.exports = function () {
  return {
    // endpoint controller functions goes here
  };
};
