import { Sequelize } from "sequelize";

const database = "fresiadb1";
const username = "admin";
const password = "Fran.!34gh";
const host = "fresiadb1.ct2g2e6oymnx.us-east-2.rds.amazonaws.com";

const db = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
});

export default db;
