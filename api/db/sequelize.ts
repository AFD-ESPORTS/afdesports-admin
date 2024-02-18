import { Sequelize } from "sequelize";
import { config } from "./config/config";
import { error } from "console";

export const sequelize: Sequelize = new Sequelize(config);

import("#db/models/associations");

// Connection test
sequelize
  .authenticate({ logging: false })
  .then(() => {
    console.log("# Connection has been established successfully.");
    // Database sync
    sequelize
      .sync({ logging: false })
      .then(() => {
        console.log("# Tables have been synced");
      })
      .catch((error) => {
        throw new Error(
          "The API encountered an error while syncing database models"
        );
      });
  })
  .catch((error) => {
    // console.error("Unable to connect to the database:", error);
    throw new Error("Unable to connect to the database");
  });
