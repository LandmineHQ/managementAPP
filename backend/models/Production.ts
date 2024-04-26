import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";

class Production extends Model {
  declare id: number;
  declare production_volume: number;
  declare product_model: string;
  declare production_date: Date;
  declare production_progress: number;
  declare quality_inspection: JSON;
}

Production.init(
  {
    production_volume: {
      type: DataTypes.INTEGER,
    },
    product_model: {
      type: DataTypes.STRING,
    },
    production_date: {
      type: DataTypes.DATE,
    },
    production_progress: {
      type: DataTypes.INTEGER,
    },
    quality_inspection: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    modelName: "Production",
  }
);

export default Production;
