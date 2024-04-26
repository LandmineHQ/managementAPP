import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";

class Sale extends Model {
  declare id: number;
  declare product_id: string;
  declare channel: string;
  declare price: number;
  declare quantity: number;
  declare country_region: string;
}

Sale.init(
  {
    product_id: {
      type: DataTypes.STRING,
    },
    channel: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    country_region: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "SalesInfo",
  }
);

export default Sale;
