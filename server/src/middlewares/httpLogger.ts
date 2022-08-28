import morgan, { StreamOptions } from "morgan";
import config from "../config/env";
import { Logger } from "../handlers";

const stream: StreamOptions = {
	// Use Logger http log level
	write: (message) => Logger.http(message),
};

// Skip http log in production mode.
const skip = () => {
	return config.NODE_ENV === "production";
};

// morgan middleware
export const morganMiddleware = morgan(":method :url :status :res[content-length] - :response-time ms", {
	stream,
	skip,
});
