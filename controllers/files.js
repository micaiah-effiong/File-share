const { promises: fsPromises } = require("fs");
const fs = require("fs");
const mime = require("mime");
const path = require("path");
const zlib = require("zlib");
const {
  listFiles: fileList,
  errorResponse,
  asyncHandler,
  processRange,
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
    let file = data.filter((item) => item.filename == fileName)[0];
    if (!file || file.length < 1) {
      return next(errorResponse("Error: Resource not found", 404));
    }
    let filePath = path.resolve(__dirname, "..", "files", fileName);
    res.json({
      status: true,
      data: file,
    });
  }),

  uploadFile: asyncHandler(async (req, res, next) => {
    // run express file upload to handle file uploading
    if (!req.files) return next(errorResponse("No files were uploaded.", 400));

    try {
      let files = { ...req.files };
      if (files.upload.length && files.upload.length > 1) {
        files.upload.forEach(async (file) => {
          await file.mv(path.join(filesDir, file.name));
        });
      } else {
        await files.upload.mv(path.join(filesDir, files.upload.name));
      }
      res.json({
        status: true,
        msg: "Uploads was successful",
      });
    } catch (err) {
      console.log(err);
      return next(err);
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

  streamFile: asyncHandler(async (req, res, next) => {
    const fileName = req.params.id;
    const filePath = path.resolve(__dirname, "..", "files", fileName);

    fs.stat(filePath, function (err, stats) {
      if (err) {
        return res.status(404).json({ status: false });
      }

      if (!stats.isFile()) {
        return res.json({
          status: false,
          msg: "Directory access is forbidden",
        });
      }

      let option = {};
      let len = stats.size;

      if (req.headers.range) {
        console.log(">>> Found range request", req.headers.range);
        option = processRange(res, req.headers.range, len);

        len = option.end - option.start + 1;

        res.status(206); // partial content

        let contentTypeString = `bytes ${option.start}-${option.end}/${stats.size}`;

        res.setHeader("Content-Range", contentTypeString);
      }

      res.setHeader("Content-Length", len);

      let type = mime.lookup(filePath);
      res.setHeader("Content-Type", type);
      res.setHeader("Accept-Ranges", "bytes");

      let file = fs.createReadStream(filePath, option);
      file.on("open", function () {
        file.pipe(res);
      });
      file.on("error", function (err) {
        console.log(err);
      });
    });
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
