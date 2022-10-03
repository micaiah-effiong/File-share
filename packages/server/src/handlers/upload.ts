import multer from "multer";
import config from "../config/env";
import { Logger } from "./logger";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		Logger.info("destination", file);
		cb(null, config.FILE_STORAGE_PATH);
	},
	filename: function (req, file, cb) {
		Logger.info("filename", file);
		cb(null, file.originalname);
	},
});

export default multer({
	storage,
	limits: { fileSize: config.MAX_UPLOAD_SIZE },
});
