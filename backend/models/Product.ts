import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index"; // 确保这里的路径根据您的项目结构进行了适当的调整

class Product extends Model {
  declare model: string;
  declare name: string;
  declare inventory: number;
  declare sold: number;
  declare cost: number;
}

Product.init(
  {
    model: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    inventory: {
      type: DataTypes.INTEGER,
    },
    sold: {
      type: DataTypes.INTEGER,
    },
    cost: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Product",
    // Sequelize 默认是使用 timestamp 的，这里按照指导原则不需要再次声明
  }
);

export default Product;
