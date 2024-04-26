import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";

class Security extends Model {
  declare id: number;
  declare incident_record: string;
  declare risk_assessment: string;
  declare preventive_measures: string;
}

Security.init(
  {
    incident_record: {
      type: DataTypes.STRING,
    },
    risk_assessment: {
      type: DataTypes.STRING,
    },
    preventive_measures: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "SecurityInfo",
  }
);

export default Security;
