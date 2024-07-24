//Importamo la conexion a la base de datos
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const fedextokens_ = db.define(
  "fedextokens_",
  {
    token: DataTypes.STRING,
  },
  {
    modelName: "fedextokens_",
    tableName: "fedextokens_",
  }
);

export default fedextokens_;
