import fs, { promises as fsPromises } from "fs";
// import fs from "fs";
import mime from "mime";
import path from "path";
// import zlib from "zlib";
import { Request, Response, NextFunction } from "express";
import { upload } from "../handlers";

import {
  listFiles as fileList,
  errorResponse,
  asyncHandler,
  processRange,
} from "../handlers";
const filesDir: string = path.resolve(__dirname, "..", "files");

// endpoint controller functions goes here
export const getAllFiles = asyncHandler(
  async (_: Request, res: Response, next: NextFunction) => {
    let data = await fileList();
    res.json({
      status: true,
      data,
    });
  }
);

export const getOneFile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let fileName = req.params.id;
    let data = await fileList();
    let file = data.find((item) => item.filename === fileName);
    if (!file) {
      return next(errorResponse("Error: Resource not found", 404));
    }
    let filePath = path.resolve(__dirname, "..", "files", fileName);

    if (req.query.raw === "true") {
      return res.sendFile(filePath);
    }

    res.json({
      status: true,
      data: file,
    });
  }
);

export const uploadFile = [
  upload.single("upload"),
  asyncHandler(async (_: Request, res: Response, __: NextFunction) => {
    res.json({
      status: true,
      msg: "Uploads was successful",
    });
  }),
];

export const downloadFile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

export const streamFile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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

      let option: { start: number | undefined; end: number | undefined } =
        Object.create(null);
      let len = stats.size;

      if (req.headers.range) {
        console.log(">>> Found range request", req.headers.range);
        const { start, end } = processRange(req.headers.range, len);
        option.end = end;
        option.start = start;

        if (option.start > len - 1) {
          res.setHeader("Content-Range", "bytes */" + len);
          res.status(416);
          return res.end();
        }

        len = option.end - option.start + 1;
        let contentTypeString = `bytes ${option.start}-${option.end}/${stats.size}`;

        res.status(206); // partial content
        res.setHeader("Content-Range", contentTypeString);
      }

      let type = mime.lookup(filePath);
      res.setHeader("Content-Type", type);
      res.setHeader("Content-Length", len);
      res.setHeader("Accept-Ranges", "bytes");

      let file = fs.createReadStream(filePath, option);
      file.on("open", function () {
        file.pipe(res);
      });
      file.on("error", function (err) {
        console.log(err);
      });
    });
  }
);

export const deleteFile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let fileName = req.params.id;
    let filePath = path.resolve(__dirname, "..", "files", fileName);
    await fsPromises.unlink(filePath);
    res.json({
      status: true,
    });
  }
);
