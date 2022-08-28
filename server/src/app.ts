import dotenv from "dotenv";
import http from "http";
import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import { morganMiddleware } from "./middlewares";
import indexRouter from "./routes/index";
import { ExpressPeerServer } from "peer";
import cors from "cors";
import path from "path";
import { initIOServer } from "./io";

dotenv.config();
const app = express();

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
const peerServer = ExpressPeerServer(server, {
	// debug: true,
});

initIOServer(server);

app.use(morganMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, "public")));
app.use(cors());
app.use("/", indexRouter);

// catch 404 and forward to error handler
app.use(function (_, res, next: NextFunction) {
	return res.status(404).json({
		success: false,
		error: "NOT FOUND",
		message: "Resource not found",
		result: null,
	});
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	if (err instanceof multer.MulterError) {
		// A Multer error occurred when uploading.
	}

	res.status(err.statusCode || 500);
	res.json({
		success: false,
		error: err.name || "SERVER ERROR",
		message: err.message || "",
		result: null,
	});
});

export { app, server /* peerServer */ };
