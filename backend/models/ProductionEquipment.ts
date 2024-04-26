import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index"; // 确保这里的路径根据您的项目结构进行了适当的调整

class ProductionEquipment extends Model {
  declare id: number;
  declare model: string;
  declare name: string;
  declare efficiency: number;
  declare manufacturer_social_number: string;
  declare maintenance_date: Date;
  declare installation_date: Date;
}

ProductionEquipment.init(
  {
    model: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    efficiency: {
      type: DataTypes.INTEGER,
    },
    manufacturer_social_number: {
      type: DataTypes.STRING,
    },
    maintenance_date: {
      type: DataTypes.DATE,
    },
    installation_date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "ProductionEquipment",
  }
);

export default ProductionEquipment;
