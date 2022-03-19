import express from "express";
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

/* GET users listing. */
router.route("/").get(getAllFiles).post(uploadFile);
router.route("/:id").get(getOneFile).delete(deleteFile);
router.route("/download/:id").get(downloadFile);
router.route("/stream/:id").get(streamFile);

export default router;
