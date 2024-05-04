import { sequelize } from "@database";
import { DataTypes, Model } from "sequelize";

class Socket extends Model {
  declare id: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  declare socket_id: string;
}

Socket.init(
  {
    socket_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    modelName: "Socket",
  }
);

export default Socket;
