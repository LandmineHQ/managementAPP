import { Model, DataTypes } from "sequelize";
import { sequelize } from "@/database"; // 确保这里的路径根据您的项目结构进行了适当的调整

class Message extends Model {
  declare id: number;
  declare senderId: number;
  declare receiverId: number;
  declare content: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Message.init(
  {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.INTEGER,
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
