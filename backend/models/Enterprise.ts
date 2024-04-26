import { Model, DataTypes } from "sequelize";
import { sequelize } from "@models";

class Enterprise extends Model {
  declare social_number: string;
  declare name?: string;
  declare address?: string;
  declare legal_representative?: string;
  declare legal_contact_person?: string;
  declare contact_information?: string;
}

Enterprise.init(
  {
    social_number: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    legal_representative: {
      type: DataTypes.STRING,
    },
    legal_contact_person: {
      type: DataTypes.STRING,
    },
    contact_information: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Enterprise",
  }
);

export default Enterprise;
