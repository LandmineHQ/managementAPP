import { Model, DataTypes } from "sequelize";
import { sequelize } from "@database";

class Training extends Model {
  declare id: number;
  declare person_id: number;
  declare instructor_id: number;
  declare progress: number;
  declare course_content: JSON;
}

Training.init(
  {
    person_id: {
      type: DataTypes.INTEGER,
    },
    instructor_id: {
      type: DataTypes.INTEGER,
    },
    progress: {
      type: DataTypes.INTEGER,
    },
    course_content: {
      type: DataTypes.JSON,
    },
  },
  {
    sequelize,
    modelName: "Training",
  }
);

export default Training;
