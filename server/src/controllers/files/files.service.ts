import { DBManager } from "../../models";
import { File } from "../../models/file";
import type { FileModel } from "../../models";
import { errorResponse } from "../../handlers";

export const listFiles = async (): Promise<FileModel[]> => {
  const data = await DBManager(File).find({});
  return data;
};

export const fetchFile = async (id: string): Promise<FileModel> => {
  const data = await DBManager(File).findById(id);
  console.log({ data, id });

  if (!data) throw errorResponse("Documents not found", 404);
  return data;
};
