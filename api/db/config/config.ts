import pg from "pg";
import type { Options } from "sequelize/types";
import dotenv from "dotenv";
dotenv.config();

export const config: Options = {
  username: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: parseInt(process.env.PG_PORT || "3232", 10),
  database: process.env.PG_DATABASE,
  replication: false,
  dialect: "postgres",
  dialectModule: pg,
};
