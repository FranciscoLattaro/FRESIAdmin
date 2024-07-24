//Importamos la conexion a la base de datos
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const detallecompras_ = db.define(
  "detallecompras_",
  {
    sku: DataTypes.STRING,
    talla: DataTypes.STRING,
    nro_shein: DataTypes.STRING,
    pedido_shopify: DataTypes.STRING,
    id_EstadoTraking: DataTypes.INTEGER,
    id_EImpotacion: DataTypes.INTEGER,
    comprado: DataTypes.BOOLEAN,
    reembolsado: DataTypes.BOOLEAN,
    comprado2: DataTypes.BOOLEAN,
    reembolsado2: DataTypes.BOOLEAN,
  },
  {
    modelName: "detallecompras_",
    tableName: "detallecompras_",
  }
);

export default detallecompras_;
