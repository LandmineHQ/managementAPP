import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index"; // 确保这里的路径根据您的项目结构进行了适当的调整

class Business extends Model {
  declare id: number;
  declare product_id: string;
  declare sales_amount: number;
  declare customer_id: number;
  declare satisfaction: number;
}

Business.init(
  {
    product_id: {
      type: DataTypes.STRING,
    },
    sales_amount: {
      type: DataTypes.INTEGER,
    },
    customer_id: {
      type: DataTypes.INTEGER,
    },
    satisfaction: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0, // 满意度最小值为0
        max: 100, // 满意度最大值为100
      },
    },
  },
  {
    sequelize,
    modelName: "BusinessInfo",
    // Sequelize 默认是使用 timestamp 的，这里按照指导原则不需要再次声明
  }
);

export default Business;
