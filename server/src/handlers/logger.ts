import winston, { createLogger } from "winston";
import config from "../config/env";

const colors = {
	error: "red",
	warn: "yellow",
	info: "green",
	http: "magenta",
	debug: "white",
} as const;

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
} as const;

const format = winston.format.combine(
	winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
	winston.format.colorize({ all: true }),
	winston.format.json(),
	winston.format.errors({ stack: true }),
	winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
);
const transports = [new winston.transports.Console(), new winston.transports.File({ filename: "combined.log" })];

winston.addColors(colors);

export const Logger = createLogger({
	transports,
	levels,
	format,
	level: config.NODE_ENV === "production" ? "warn" : "debug",
});
