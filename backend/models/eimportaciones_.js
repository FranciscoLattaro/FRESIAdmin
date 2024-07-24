//Importamos la conexion a la base de datos
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const eimportaciones_ = db.define(
  "eimportaciones_",
  {
    id_Franquicia: DataTypes.INTEGER,
    franquicia: DataTypes.STRING,
    nros_shein: DataTypes.STRING,
    detalle_compra: DataTypes.STRING,
    tarjeta: DataTypes.STRING,
    tracking_1: DataTypes.STRING,
    emp_tr_1: DataTypes.STRING,
    estado_tracking_1: DataTypes.STRING,
    tracking_2: DataTypes.STRING,
    emp_tr_2: DataTypes.STRING,
    estado_tracking_2: DataTypes.STRING,
    tracking_3: DataTypes.STRING,
    emp_tr_3: DataTypes.STRING,
    estado_tracking_3: DataTypes.STRING,
    tracking_4: DataTypes.STRING,
    emp_tr_4: DataTypes.STRING,
    estado_tracking_4: DataTypes.STRING,
    tracking_5: DataTypes.STRING,
    emp_tr_5: DataTypes.STRING,
    estado_tracking_5: DataTypes.STRING,
  },
  {
    modelName: "eimportaciones_",
    tableName: "eimportaciones_",
  }
);

export default eimportaciones_;
