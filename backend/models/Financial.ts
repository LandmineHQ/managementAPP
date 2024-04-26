import { Model, DataTypes } from "sequelize";
import { sequelize } from "./index";

class Financial extends Model {
  declare transaction_id: string;
  declare account_id: string;
  declare date: Date;
  declare description: string;
  declare transaction_amount: number;
  declare balance: number;
}

Financial.init(
  {
    transaction_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    account_id: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    description: {
      type: DataTypes.STRING,
    },
    transaction_amount: {
      type: DataTypes.INTEGER,
    },
    balance: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "FinancialInfo",
  }
);

export default Financial;
