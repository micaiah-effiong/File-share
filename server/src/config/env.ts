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
  DB_STORAGE:
    path.resolve(process.env.DB_STORAGE as string) ||
    path.resolve(process.cwd(), "dist", "data", "database.sqlite"),
  FILE_STORAGE_PATH:
    process.env.FILE_STORAGE_PATH ||
    path.resolve(process.cwd(), "dist", "files"),
  MAX_UPLOAD_SIZE:
    parseInt(process.env.FILE_UPLOAD_LIMIT as string) || MAX_UPLOAD_SIZE,
};

// TODO: create a function that check all required env in config
// should throw error if any of the variables is not initialized
export default config;
