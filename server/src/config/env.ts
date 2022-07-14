import path from "path";

type ServerConfig = {
  PORT: number;
  ORIGIN: string;
  NODE_ENV: string;
  DB_STORAGE: string;
};

const port = 3300;
const config: ServerConfig = {
  NODE_ENV: process.env.NODE_ENV || "development",
  ORIGIN: process.env.ORIGIN || "",
  PORT: parseInt(process.env.PORT as string) || port,
  DB_STORAGE: path.resolve(
    __dirname,
    process.env.DB_STORAGE || "../data/",
    "database.sqlite"
  ),
};

// TODO: create a function that check all required env in config
// should throw error if any of the variables is not initialized
export default config;
