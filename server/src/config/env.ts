import path from "path";

type ServerConfig = {
  PORT: number;
  ORIGIN: string;
  NODE_ENV: string;
  DB_STORAGE: string;
  FILE_STORAGE_PATH: string;
  MAX_UPLOAD_SIZE: number;
};

const port = 3300;
const MAX_UPLOAD_SIZE = 5 * 1024 * 1024 * 1024;
const config: ServerConfig = {
  NODE_ENV: process.env.NODE_ENV || "development",
  ORIGIN: process.env.ORIGIN || "",
  PORT: parseInt(process.env.PORT as string) || port,
  DB_STORAGE: path.resolve(
    process.env.DB_STORAGE || process.cwd(),
    "dist",
    "data",
    "database.sqlite"
  ),
  FILE_STORAGE_PATH: path.resolve(
    process.env.FILE_STORAGE_PATH || process.cwd(),
    "dist",
    "files"
  ),
  MAX_UPLOAD_SIZE:
    parseInt(process.env.FILE_UPLOAD_LIMIT as string) || MAX_UPLOAD_SIZE,
};
console.log(config);

(function (env: Record<string, string | number | undefined>) {
  Object.keys(env).map((item: string) => {
    if (typeof env[item] === "undefined")
      throw new Error(`Incomplete setup: Missing ${item} in env`);
  });
})(config);

export default config;
