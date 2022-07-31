import { DataTypes, Model, InferCreationAttributes, InferAttributes, CreationOptional, ModelOptions } from "sequelize";
import { sequelize } from "./db/config";
import type { FileData } from "../types";

export interface FileModel extends Model<InferAttributes<FileModel>, InferCreationAttributes<FileModel>>, FileData {
	id: CreationOptional<string>;
	createdAt: CreationOptional<Date>;
	updatedAt: CreationOptional<Date>;
}

const fileSchema = {
	filename: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	short: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	size: {
		type: DataTypes.STRING,
	},
	link: {
		type: DataTypes.STRING,
	},
	downloadLink: {
		type: DataTypes.STRING,
	},
	streamLink: {
		type: DataTypes.STRING,
	},
	fileType: {
		type: DataTypes.STRING,
	},

	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
	},
	createdAt: DataTypes.DATE,
	updatedAt: DataTypes.DATE,
};

export const File = sequelize.define<FileModel>("File", fileSchema, {
	sequelize,
} as ModelOptions);
