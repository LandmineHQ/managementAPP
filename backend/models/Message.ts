import { Model, DataTypes } from "sequelize";
import { sequelize } from "@/database"; // 确保这里的路径根据您的项目结构进行了适当的调整

class Message extends Model {
  declare id: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  declare type: string;
  declare content: string;
  // 是否已读
  declare isRead: boolean;
}

Message.init(
  {
    type: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    content: {
      type: DataTypes.JSON,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    modelName: "Message",
  }
);

export default Message;
