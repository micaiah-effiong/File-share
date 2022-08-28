import fs, { promises as fsPromises } from "fs";
// import fs from "fs";
import mime from "mime";
import path from "path";
// import zlib from "zlib";
import { Request, Response, NextFunction } from "express";
import { convertByte, getDownloadLink, getFileLink, getShortName, getStreamLink, Logger, upload } from "../../handlers";

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

export const getOneFile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	let data = await fetchFile(req.params.id);

	res.json({
		status: true,
		data,
	});
});

export const uploadFile = [
	upload.single("upload"),
	asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
		if (!req.file) throw errorResponse("No file was uploaded", 400);

		const filename = req.file.filename;
		const fileSample = DBManager(File).build({
			filename: filename,
			size: convertByte(req.file.size),
			fileType: mime.lookup(filename),
			short: getShortName(filename),
			downloadLink: "",
			link: "",
			streamLink: "",
		});

		fileSample.set({
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

export const downloadFile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const file = await fetchFile(req.params.id);
	const filePath = path.resolve(config.FILE_STORAGE_PATH, file.filename);
	res.download(filePath, file.filename);
});

export const streamFile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const file = await fetchFile(req.params.id);
	const filePath = path.resolve(config.FILE_STORAGE_PATH, file.filename);
	const fileStats = await fsPromises.stat(filePath);

	const option: { start: number | undefined; end: number | undefined } = Object.create(null);
	let len = fileStats.size;

	if (req.headers.range) {
		Logger.info(">>> Found range request", req.headers.range);
		const { start, end } = processRange(req.headers.range, len);
		option.end = end;
		option.start = start;

		if (option.start > len - 1) {
			res.setHeader("Content-Range", "bytes */" + len);
			res.status(416);
			return res.end();
		}

		len = option.end - option.start + 1;
		const contentTypeString = `bytes ${option.start}-${option.end}/${fileStats.size}`;

		res.status(206); // partial content
		res.setHeader("Content-Range", contentTypeString);
	}

	const type = mime.lookup(filePath);
	res.setHeader("Content-Type", type);
	res.setHeader("Content-Length", len);
	res.setHeader("Accept-Ranges", "bytes");

	const fileStream = fs.createReadStream(filePath, option);
	fileStream.on("open", function () {
		fileStream.pipe(res);
	});
	fileStream.on("error", function (err) {
		Logger.info(err);
	});
});

export const deleteFile = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
	const file = await DBManager(File).findById(req.params.id);
	if (!file) throw errorResponse("File does not exist", 400);

	const filePath = path.resolve(config.FILE_STORAGE_PATH, file.filename);
	await Promise.all([file.destroy(), fsPromises.unlink(filePath).catch((error) => console.error(error))]);

	res.json({
		status: true,
	});
});
