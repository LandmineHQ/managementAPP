import { Model, DataTypes } from "sequelize";
import { sequelize } from "@database"; // 确保这里的路径根据您的项目结构进行了适当的调整

class VerificationCode extends Model {
  declare id: number;
  declare email: string;
  declare code: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

VerificationCode.init(
  {
    email: {
      type: DataTypes.STRING,
    },
    code: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "VerificationCode",
  }
);

export default VerificationCode;
