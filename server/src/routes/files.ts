import express from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { files } from "../controllers";
const {
  getAllFiles,
  getOneFile,
  uploadFile,
  downloadFile,
  deleteFile,
  streamFile,
} = files;

const router = express.Router();
// router
//   .use
// fileUpload({
//   limits: { fileSize: 5 * 1024 * 1024 * 1024 },
//   useTempFiles: true,
//   tempFileDir: path.resolve(__dirname, "..", "files", "tmp"),
// })
// ();

/* GET users listing. */
router.route("/").get(getAllFiles).post(uploadFile);
router.route("/:id").get(getOneFile).delete(deleteFile);
router.route("/download/:id").get(downloadFile);
router.route("/stream/:id").get(streamFile);

export default router;
