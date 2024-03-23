// Models
import { Users } from "#services/users/users.model";
import { AccessLevels } from "#services/accessLevels/accessLevels.model";
import { LoLAccounts } from "#root/services/players/lolAccounts.model";

// Users
Users.hasOne(AccessLevels, {
  foreignKey: "access_level",
  as: "accessLevel",
});

Users.hasMany(LoLAccounts, {
  foreignKey: "id",
  as: "lolPlayers",
});

AccessLevels.belongsTo(Users, {
  foreignKey: "access_level",
  as: "users",
});
