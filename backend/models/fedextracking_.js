//Importamo la conexion a la base de datos
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const fedextracking_ = db.define(
  "fedextracking_",
  {
    description: DataTypes.STRING,
    ciudad: DataTypes.STRING,
    estado: DataTypes.STRING,
    pais: DataTypes.STRING,
  },
  {
    modelName: "fedextracking_",
    tableName: "fedextracking_",
  }
);

export default fedextracking_;
