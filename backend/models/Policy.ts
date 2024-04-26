import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";

class Policy extends Model {
  declare id: number;
  declare name: string;
  declare type: string;
  declare release_date: Date;
  declare implementation_date: Date;
}

Policy.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    type: {
      type: DataTypes.STRING,
    },
    release_date: {
      type: DataTypes.DATE,
    },
    implementation_date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Policy",
  }
);

export default Policy;
