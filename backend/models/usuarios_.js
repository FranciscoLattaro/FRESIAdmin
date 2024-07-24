import { DataTypes } from "sequelize";
import db from "../database/db.js";

const usuarios_ = db.define('usuarios_', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      // Expresión regular para letras, espacios y caracteres acentuados
      is: {
        args: /^[A-Za-zÀ-ÖØ-Ýà-öø-ÿ\s]+$/,
        msg: "El nombre solo puede contener letras, espacios y caracteres acentuados"
      },
      len: {
        args: [2, 255],
        msg: "El nombre tiene que ser mínimamente de dos caracteres"
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        msg: "El email tiene que ser un correo válido"
      }
    }
  }
}, {
  modelName: 'usuarios_',
  tableName: 'usuarios_'
});

export default usuarios_;
