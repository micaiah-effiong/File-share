import fs, { promises as fsPromises } from "fs";
// import fs from "fs";
import mime from "mime";
import path from "path";
// import zlib from "zlib";
import { Request, Response, NextFunction } from "express";
import {
  convertByte,
  getDownloadLink,
  getFileLink,
  getShortName,
  getStreamLink,
  upload,
} from "../../handlers";

import { errorResponse, asyncHandler, processRange } from "../../handlers";
import { DBManager } from "../../models";
import { File } from "../../models/file";
import { fetchFile, listFiles } from "./files.service";
import config from "../../config/env";

// endpoint controller functions goes here
export const getAllFiles = asyncHandler(async (_: Request, res: Response) => {
  let data = await listFiles();
  res.json({
    status: true,
    data,
  });
});

export const getOneFile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let data = await fetchFile(req.params.id);

    res.json({
      status: true,
      data,
    });
  }
);

export const uploadFile = [
  upload.single("upload"),
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) throw errorResponse("No file was uploaded", 400);

    const filename = req.file.filename;
    const fileSample = DBManager(File).build({
      filename: filename,
      size: convertByte(req.file.size),
      fileType: mime.lookup(filename),
      short: "",
      downloadLink: "",
      link: "",
      streamLink: "",
    });

    fileSample.set({
      short: getShortName(fileSample.id),
      downloadLink: getDownloadLink(fileSample.id),
      link: getFileLink(fileSample.id),
      streamLink: getStreamLink(fileSample.id),
    });

    await fileSample.save();

    res.json({
      status: true,
      msg: "Uploads was successful",
    });
  }),
];

export const downloadFile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const fileName = req.params.id;
    const filePath = path.resolve(config.FILE_STORAGE_PATH, fileName);

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
