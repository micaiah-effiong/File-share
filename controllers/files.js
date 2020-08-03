const { promises: fsPromises } = require("fs");
const path = require("path");
const {
  listFiles: fileList,
  errorResponse,
  asyncHandler,
} = require("../handlers/index");
const filesDir = path.resolve(__dirname, "..", "files");

module.exports = {
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
    let data = await fileList();
    let file = data.filter((item) => item.filename == fileName);
    if (!file || file.length < 1) {
      return next(errorResponse("Error: Resource not found", 404));
    }
    let filePath = path.resolve(__dirname, "..", "files", fileName);
    res.sendFile(filePath);
  }),

  uploadFile: asyncHandler(async (req, res, next) => {
    // run express file upload to handle file uploading
    if (!req.files) return next(errorResponse("No files were uploaded.", 400));

    try {
      let files = { ...req.files };
      if (files.upload.length && files.upload.length > 1) {
        await files.upload.forEach(async (file) => {
          await file.mv(path.join(filesDir, file.name)).catch(next);
        });
      } else {
        await files.upload.mv(path.join(filesDir, files.upload.name));
      }
    } finally {
      res.json({
        status: true,
        msg: "Uploads was successful",
      });
    }
  }),

  downloadFile: asyncHandler(async (req, res, next) => {
    let fileName = req.params.id;
    let filePath = path.resolve(__dirname, "..", "files", fileName);
    res.download(filePath, fileName);
  }),

  deleteFile: asyncHandler(async (req, res, next) => {
    let fileName = req.params.id;
    let filePath = path.resolve(__dirname, "..", "files", fileName);
    await fsPromises.unlink(fileName);
    res.json({
      status: true,
    });
  }),
};
