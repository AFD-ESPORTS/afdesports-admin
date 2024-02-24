// Models
import { Users } from "#services/users/users.model";
import { AccessLevels } from "#services/accessLevels/accessLevels.model";

Users.hasOne(AccessLevels, {
  foreignKey: "access_level",
  as: "accessLevel",
});

AccessLevels.belongsTo(Users, {
  foreignKey: "access_level",
  as: "users",
});
