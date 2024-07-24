//Importamo la conexion a la base de datos
import db from "../database/db.js";
//importamos sequelize
import { DataTypes } from "sequelize";

const franquicias_ = db.define('franquicias_',{
  nombre_completo: DataTypes.STRING,
  cedula_identidad: DataTypes.STRING,
  fecha_nac: DataTypes.STRING,
  email_fr: DataTypes.STRING,
  pass_fr: DataTypes.STRING,
  suite_fr: DataTypes.STRING,
  activa: DataTypes.BOOLEAN
}, {
  modelName: 'franquicias_',
  tableName: 'franquicias_'
}
)

export default franquicias_