const express = require("express");
const router = express.Router();
const filesRouter = require("./files");

router.use("/files", filesRouter);

module.exports = router;
