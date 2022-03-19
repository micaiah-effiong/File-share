import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file, "destination");
    cb(null, path.resolve(process.cwd(), "dist", "files"));
  },
  filename: function (req, file, cb) {
    console.log(file, "filename");

    cb(null, file.originalname);
  },
});

export default multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 * 1024 },
});
