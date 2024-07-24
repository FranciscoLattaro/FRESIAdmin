//Importamos la conexion a la base de datos
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const codigosregistro_ = db.define(
  "codigosregistro_",
  {
    codigo: DataTypes.STRING,
  },
  {
    modelName: "codigosregistro_",
    tableName: "codigosregistro_",
  }
);

export default codigosregistro_;
