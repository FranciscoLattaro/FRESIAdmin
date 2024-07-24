import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import usuarios_ from '../models/usuarios_.js'; // Asegúrate de importar el modelo correcto

const secret = 'tu_clave_secreta'; // Asegúrate de usar una clave secreta segura y mantenerla en una variable de entorno.

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Verifica las credenciales del usuario
  const user = await getUserByEmail(email);
  if (!user || !user.isPasswordValid(password)) {
    return res.status(401).send('Email o contraseña incorrectos');
  }

  // Genera el token JWT
  const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });

  // Devuelve el token al cliente
  res.json({ token });
};
