import { sequelize } from "#db/sequelize";
import { DataTypes } from "sequelize";

export const LoLAccounts = sequelize.define("LoLAccounts", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  lol_account_name: { type: DataTypes.STRING, allowNull: false },
  lol_account_id: { type: DataTypes.STRING, allowNull: true },
});
