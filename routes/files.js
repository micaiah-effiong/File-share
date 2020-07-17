const express = require("express");
const fileUpload = require("express-fileupload");
const {
  files: { getAllFiles, getOneFile, uploadFile, downloadFile, deleteFile },
} = require("../controllers/index");
const router = express.Router();
router.use(fileUpload());

/* GET users listing. */
router.route("/").get(getAllFiles).post(uploadFile);
router.route("/:id").get(getOneFile).delete(deleteFile);
router.route("/download/:id").get(downloadFile);

module.exports = router;
