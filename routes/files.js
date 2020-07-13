const express = require("express");
const {
  files: { getAllFiles, getOneFile, uploadFile, downloadFile, deleteFile },
} = require("../controllers/index");
const router = express.Router();

/* GET users listing. */
router.route("/").get(getAllFiles).post(uploadFile);
router.route("/:id").get(getOneFile).delete(deleteFile);
router.route("/download/:id").get(downloadFile);

module.exports = router;
