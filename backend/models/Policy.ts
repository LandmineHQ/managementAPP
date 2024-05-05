import { Model, DataTypes } from "sequelize";
import { sequelize } from "@database";

class Policy extends Model {
  declare id: number;
  declare createAt: Date;
  declare updateAt: Date;

  declare name: string;
  declare type: string;
  declare release_date: Date;
  declare implementation_date: Date;
  declare content: {
    title: string;
    content: string;
    analysis: string;
  };
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
    content: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    modelName: "Policy",
  }
);

export default Policy;
