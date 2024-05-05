import { Model, DataTypes } from "sequelize";
import { sequelize } from "@database";

class Training extends Model {
  declare id: number;
  declare createdAt: Date;
  declare updatedAt: Date;

  declare progress: number;
  declare course_content: JSON;
  declare steps: JSON;
  declare steps_active: number;
}

Training.init(
  {
    progress: {
      type: DataTypes.INTEGER,
    },
    course_content: {
      type: DataTypes.JSON,
    },
    steps: {
      type: DataTypes.JSON,
    },
    steps_active: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Training",
  }
);

export default Training;
