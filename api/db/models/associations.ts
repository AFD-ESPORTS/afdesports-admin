import { sequelize } from "#db/sequelize";

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

// sequelize.sync();
//   .then(() => {
//     console.log("Tables have been synced");
//   })
//   .catch((error) => {
//     // console.error(
//     //   "The API encountered an error while syncing database models :",
//     //   error
//     // );
//   });
