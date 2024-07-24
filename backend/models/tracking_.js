//Importamo la conexion a la base de datos
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const tracking_ = db.define(
  "tracking_",
  {
    emp_trans: DataTypes.STRING,
    tracking_ext: DataTypes.STRING,
    tracking_unique: DataTypes.STRING,
    id_Franquicia: DataTypes.STRING,
    id_EImportacion: DataTypes.STRING,
    id_estado: DataTypes.STRING,
  },
  {
    modelName: "tracking_",
    tableName: "tracking_",
  }
);

export default tracking_;
