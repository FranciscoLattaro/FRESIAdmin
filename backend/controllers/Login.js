import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import usuarios_ from '../models/usuarios_.js'; // Asegúrate de importar el modelo correcto

const secret = 'tu_clave_secreta'; // Asegúrate de usar una clave secreta segura y mantenerla en una variable de entorno.

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar el usuario por email
    const user = await usuarios_.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Email o contraseña incorrectos' });
    }

    // Generar el token JWT
    const token = jwt.sign({ userId: user.id }, secret, {
      expiresIn: '1h', // Token válido por 1 hora
    });

    console.log("Token: "+token)
    // Enviar el token al cliente
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
