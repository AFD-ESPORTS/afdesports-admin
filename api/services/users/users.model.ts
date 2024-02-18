import { sequelize } from "#db/sequelize";
import { DataTypes } from "sequelize";

export const Users = sequelize.define("Users", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  username: { type: DataTypes.STRING, allowNull: false },
  access_level: { type: DataTypes.INTEGER, allowNull: false },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  discord_username: { type: DataTypes.STRING, allowNull: true },
  lol_account: { type: DataTypes.STRING, allowNull: true },
  token_issue_date: { type: DataTypes.DATE, allowNull: true },
});
