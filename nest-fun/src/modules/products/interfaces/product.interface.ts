import { Optional } from "sequelize";

export interface IProductAttributes {
  id: number;
  price: number;
  title: string;
  description: string;
}

export interface IProductCreationAttributes extends Optional<IProductAttributes, 'id'> {}