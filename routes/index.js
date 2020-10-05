const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const apiRouter = require("./api");

router.use("/auth", authRouter);
router.use("/api", apiRouter);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("dashboard");
});

router.get("/p2p", function (req, res, next) {
  res.render("p2p");
});

module.exports = router;
