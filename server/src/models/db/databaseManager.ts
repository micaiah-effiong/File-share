import {
  Model,
  FindOptions,
  InferAttributes,
  InferCreationAttributes,
  ModelStatic,
  Identifier,
  NonNullFindOptions,
  UpdateOptions,
  DestroyOptions,
} from "sequelize";
import { MakeNullishOptional } from "sequelize/types/utils";

class DatabaseManager<T extends Model> {
  private model;
  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async find(query: FindOptions<InferAttributes<T>>) {
    return await this.model.findAll(query);
  }

  async findById(id: Identifier) {
    return await this.model.findByPk(id);
  }

  async findOne(query: NonNullFindOptions<InferAttributes<T>>) {
    return await this.model.findOne(query);
  }

  async create(payload: MakeNullishOptional<InferCreationAttributes<T>>) {
    return await this.model.create(payload);
  }

  async update(
    payload: Partial<InferCreationAttributes<T>>,
    filter: UpdateOptions<T>
  ) {
    return await this.model.update(payload, filter);
  }

  async delete(filter: DestroyOptions<InferCreationAttributes<T>>) {
    return await this.model.destroy(filter);
  }
}

export const databaseManager = <T extends Model>(model: ModelStatic<T>) => {
  return new DatabaseManager<InstanceType<typeof model>>(model);
};
