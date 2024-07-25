//Importamo la conexion a la base de datos
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const filerecords = db.define(
  "filerecords",
  {

    filePath:DataTypes.STRING,description:DataTypes.STRING,amount:DataTypes.FLOAT,currency:DataTypes.STRING,
   
  },
  {
    modelName: "filerecords",
    tableName: "filerecords",
  }
);

export default filerecords;
