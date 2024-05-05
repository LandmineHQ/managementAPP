import { sequelize } from "@database";
import { DataTypes, Model } from "sequelize";

class Group extends Model {
  declare id: number;
  declare createAt: Date;
  declare updateAt: Date;

  declare name: string;
  declare description: string;
  declare members: Array<number>;
}

Group.init(
  {
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    members: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    modelName: "Group",
  }
);

export default Group;
