const { promises: fsPromises } = require("fs");
const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
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
    const fileName = req.params.id;
    const filePath = path.resolve(__dirname, "..", "files", fileName);
    // const zipPath = filePath + ".gz";
    // const zipName = path.parse(zipPath).base;

    // const zip = zlib.createGzip();
    // const rs = fs.createReadStream(filePath);
    // const ws = fs.createWriteStream(zipPath);
    // rs.pipe(zip)
    //   .pipe(ws)
    //   .on("finish", async (err) => {
    //     if (err) return console.log(err);
    //     res.download(zipPath, zipName);
    //     //     // await fsPromises.unlink(filePath + ".gz").catch(console.log);
    //   });
    res.download(filePath, fileName);
  }),

  deleteFile: asyncHandler(async (req, res, next) => {
    let fileName = req.params.id;
    let filePath = path.resolve(__dirname, "..", "files", fileName);
    await fsPromises.unlink(filePath);
    res.json({
      status: true,
    });
  }),
};
