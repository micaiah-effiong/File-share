import { Sequelize } from "sequelize";
import config from "../../config/env";
import { Logger } from "../../handlers";

export const sequelize = new Sequelize({
	dialect: "sqlite",
	storage: config.DB_STORAGE,
	logging: (str) => Logger.info(str),
});
