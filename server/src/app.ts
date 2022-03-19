import dotenv from "dotenv";
import createError from "http-errors";
import http from "http";
import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import path from "path";
// import cookieParser from "cookie-parser";
import logger from "morgan";
import indexRouter from "./routes/index";
import { ExpressPeerServer } from "peer";

dotenv.config();
const app = express();

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
const peerServer = ExpressPeerServer(server, {
  // debug: true,
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/peer", peerServer);

// catch 404 and forward to error handler
app.use(function (req, res, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  if (err instanceof multer.MulterError) {
    // A Multer error occurred when uploading.
  }

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export { app, server, peerServer };
