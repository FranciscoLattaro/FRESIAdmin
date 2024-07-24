//Importamos la conexion a la base de datos
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const bimportaciones_ = db.define(
  "bimportaciones_",
  {
    email_shein: DataTypes.STRING,
    pass_shein: DataTypes.STRING,
    email_google: DataTypes.STRING,
    pass_google: DataTypes.STRING,
    nro_shein: DataTypes.STRING,
    procesado: DataTypes.BOOLEAN,
    id_EImportacion: DataTypes.INTEGER,
  },
  {
    modelName: "bimportaciones_",
    tableName: "bimportaciones_",
  }
);

export default bimportaciones_;
