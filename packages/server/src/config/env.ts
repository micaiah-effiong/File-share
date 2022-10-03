import path from "path";

type ServerConfig = {
	PORT: number;
	ORIGIN: string;
	NODE_ENV: string;
	DB_STORAGE: string;
	FILE_STORAGE_PATH: string;
	MAX_UPLOAD_SIZE: number;
	STREAM_CUNK_SIZE: number;
};

const port = 3300;
const MAX_UPLOAD_SIZE = 5 * 10 ** 9; //5GB
const STREAM_CUNK_SIZE = 10 ** 6; //1MB

const config: ServerConfig = {
	NODE_ENV: process.env.NODE_ENV || "development",
	ORIGIN: process.env.ORIGIN || "",
	PORT: parseInt(process.env.PORT as string) || port,
	DB_STORAGE: path.resolve(process.env.DB_STORAGE || process.cwd(), "src", "data", "database.sqlite"),
	FILE_STORAGE_PATH: path.resolve(process.env.FILE_STORAGE_PATH || process.cwd(), "src", "files"),
	MAX_UPLOAD_SIZE: parseInt(process.env.FILE_UPLOAD_LIMIT as string) || MAX_UPLOAD_SIZE,
	STREAM_CUNK_SIZE: parseInt(process.env.STREAM_CUNK_SIZE as string) || STREAM_CUNK_SIZE,
};

(function (env: Record<string, string | number | undefined>) {
	Object.keys(env).map((item: string) => {
		if (typeof env[item] === "undefined") throw new Error(`Incomplete setup: Missing ${item} in env`);
	});
})(config);

export default config;
