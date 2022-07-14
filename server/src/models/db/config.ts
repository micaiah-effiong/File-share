import { Sequelize } from "sequelize";
import config from "../../config/env";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: config.DB_STORAGE,
});
