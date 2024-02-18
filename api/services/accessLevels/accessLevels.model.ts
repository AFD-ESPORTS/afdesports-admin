import { sequelize } from "#db/sequelize";
import { DataTypes } from "sequelize";

export const AccessLevels = sequelize.define("AccessLevels", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  access_level: { type: DataTypes.INTEGER, allowNull: false },
  level_name: { type: DataTypes.STRING, allowNull: false },
});
