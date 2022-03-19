import { Router, Request, Response, NextFunction } from "express";
import authRouter from "./auth";
import apiRouter from "./api";
const router: Router = Router();

router.use("/auth", authRouter);
router.use("/api", apiRouter);

/* GET home page. */
router.get("/", function (req: Request, res: Response, next: NextFunction) {
  res.render("dashboard");
});

router.get("/p2p", function (req, res, next) {
  res.render("p2p");
});

export default router;
