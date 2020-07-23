const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const {
  files: { getAllFiles, getOneFile, uploadFile, downloadFile, deleteFile },
} = require("../controllers/index");

const router = express.Router();
router.use(
  fileUpload({
    limits: { fileSize: 5 * 1024 * 1024 * 1024 },
    useTempFiles: true,
    tempFileDir: path.resolve(__dirname, "..", "files", "tmp"),
  })
);

/* GET users listing. */
router.route("/").get(getAllFiles).post(uploadFile);
router.route("/:id").get(getOneFile).delete(deleteFile);
router.route("/download/:id").get(downloadFile);

module.exports = router;
