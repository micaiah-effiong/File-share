import multer from "multer";
import config from "../config/env";

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		console.log(file, "destination");
		cb(null, config.FILE_STORAGE_PATH);
	},
	filename: function (req, file, cb) {
		console.log(file, "filename");
		cb(null, file.originalname);
	},
});

export default multer({
	storage,
	limits: { fileSize: config.MAX_UPLOAD_SIZE },
});
