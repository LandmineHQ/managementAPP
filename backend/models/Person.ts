import { Model, DataTypes } from "sequelize";
import { sequelize } from "@database";

class Person extends Model {
  declare id: number;
  declare name: string;
  declare gender?: string;
  declare Identity_card_number?: string;
  declare bank_card_number?: string;
  declare department?: string;
  declare position?: string;
  declare salary?: number;
  declare education?: string;
  declare hire_date?: string;
  declare contact?: string;
  declare emergency_contact?: string;
  declare enterprise_code?: string;
}

Person.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
    },
    Identity_card_number: {
      type: DataTypes.STRING,
      unique: true,
    },
    bank_card_number: {
      type: DataTypes.STRING,
      unique: true,
    },
    department: {
      type: DataTypes.STRING,
    },
    position: {
      type: DataTypes.STRING,
    },
    salary: {
      type: DataTypes.INTEGER,
    },
    education: {
      type: DataTypes.STRING,
    },
    hire_date: {
      type: DataTypes.STRING,
    },
    contact: {
      type: DataTypes.STRING,
    },
    emergency_contact: {
      type: DataTypes.STRING,
    },
    enterprise_code: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Employee",
  }
);

export default Person;
