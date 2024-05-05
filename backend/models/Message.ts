import { Model, DataTypes } from "sequelize";
import { sequelize } from "@/database"; // 确保这里的路径根据您的项目结构进行了适当的调整

class Message extends Model {
  declare id: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  declare type: string;
  declare content: string;
}

Message.init(
  {
    type: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    content: {
      type: DataTypes.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Message",
  }
);

export default Message;
