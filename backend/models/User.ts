import { Model, DataTypes } from "sequelize";
import { sequelize } from "@models";

class User extends Model {
  declare id: number;
  declare password: string;
  declare email: string;
  declare nickname: string;
  declare token: string;
  declare registration_date: Date;
  declare last_login: Date;
  declare preference: object;
  declare operation_record: object;
  declare identity_binding: string;
  declare avatar: string;
  declare permission: string;
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // 验证是否为有效的邮箱格式
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nickname: {
      type: DataTypes.STRING,
      defaultValue: "未命名用户",
    },
    token: {
      type: DataTypes.STRING,
    },
    registration_date: {
      type: DataTypes.DATEONLY,
    },
    last_login: {
      type: DataTypes.DATEONLY,
    },
    preference: {
      type: DataTypes.JSON,
    },
    operation_record: {
      type: DataTypes.JSON,
    },
    identity_binding: {
      type: DataTypes.INTEGER,
    },
    avatar: {
      type: DataTypes.TEXT, // Base64 编码的图片可以存储为 TEXT 类型
    },
    permission: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
