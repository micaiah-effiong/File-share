const { promises: fsPromises } = require("fs");
const path = require("path");
const {
  listFiles: fileList,
  errorResponse,
  asyncHandler,
} = require("../handlers/index");
fileList().then(console.log);
module.exports = function () {
  return {
    // endpoint controller functions goes here
    getAllFiles: asyncHandler(async (req, res, next) => {
      let data = await fileList();
      res.json({
        status: true,
        data,
      });
    }),

    getOneFile: asyncHandler(async (req, res, next) => {
      let fileName = req.params.id;
      res.json({
        status: true,
      });
    }),

    uploadFile: asyncHandler(async (req, res, next) => {
      // run express file upload to handle file uploading
    }),

    downloadFile: asyncHandler(async (req, res, next) => {
      let fileName = req.params.id;
      let filePath = path.resolve(__dirname, "..", "files", fileName);
      res.download(filePath, fileName);
    }),

    deleteFile: asyncHandler(async (req, res, next) => {
      let fileName = req.params.id;
      let filePath = path.resolve(__dirname, "..", "files", fileName);
      console.log(filePath);
      // await fsPromises.unlink(fileName);
      res.json({
        status: true,
      });
    }),
  };
};
