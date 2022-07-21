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
  CreationAttributes,
  BuildOptions,
  Attributes,
} from "sequelize";
import { MakeNullishOptional } from "sequelize/types/utils";

class DatabaseManager<T extends Model> {
  private model;
  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  async find(query: FindOptions<InferAttributes<T>> = {}) {
    return await this.model.findAll(query);
  }

  async findById(
    id: Identifier,
    options?: Omit<FindOptions<Attributes<T>>, "where">
  ) {
    return await this.model.findByPk(id, options);
  }

  async findOne(query: NonNullFindOptions<InferAttributes<T>>) {
    return await this.model.findOne(query);
  }

  async create(payload: MakeNullishOptional<InferCreationAttributes<T>>) {
    return await this.model.create(payload);
  }

  build(payload: CreationAttributes<T>, option?: BuildOptions) {
    return this.model.build(payload, option);
  }

  async update(
    payload: Partial<InferCreationAttributes<T>>,
    filter: UpdateOptions<T>
  ) {
    return await this.model.update(payload, filter);
  }

  async remove(filter: DestroyOptions<InferCreationAttributes<T>>) {
    return await this.model.destroy(filter);
  }
}

export const databaseManager = <T extends Model>(model: ModelStatic<T>) => {
  return new DatabaseManager<InstanceType<typeof model>>(model);
};
