import express from "express";
import filesRouter from "./files";

const router: express.Router = express.Router();

router.use("/files", filesRouter);

export default router;
