import { Model, DataTypes } from "sequelize";
import { sequelize } from "@database";

enum USER_PERMISSIONS {
  USER = 1 << 0,
  LAW = 1 << 1,
  OPREATION = 1 << 2,
}

class User extends Model {
  declare id: number;
  declare createAt: Date;
  declare updateAt: Date;

  declare password: string;
  declare email: string;
  declare nickname: string;
  declare token: string;
  declare last_login: Date;
  declare preference: object;
  declare operation_record: object;
  declare identity_binding: string;
  declare permission: string;
  declare phone: string;
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true, // 验证是否为有效的邮箱格式
      },
    },
    password: {
      type: DataTypes.STRING,
    },
    nickname: {
      type: DataTypes.STRING,
      defaultValue: "未命名用户",
    },
    token: {
      type: DataTypes.STRING,
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
    permission: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
export { USER_PERMISSIONS };
