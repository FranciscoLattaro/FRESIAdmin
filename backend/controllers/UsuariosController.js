import usuarios_ from "../models/usuarios_.js";

// Mostrar todos los registros
export const getAllUsers = async (req, res) => {
  try {
    const users = await usuarios_.findAll();
    res.json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Mostrar un registro
export const getUser = async (req, res, email, password) => {
  try {
    const row = await usuarios_.findAll({
      where: {
        email: email,
        password: password,
      },
    });
    if (row[0].email == email && row[0].password == password) {
    }
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Crear un registro
export const createUser = async (req, res) => 
  {
    try {
      const { name, email, password } = req.body;
  
      // Verificar si el usuario ya existe
      const existingUser = await usuarios_.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'El correo electrónico ya está en uso.' });
      }
  
      // Crear el nuevo usuario
      const newUser = await usuarios_.create({
        name,
        email,
        password
      });
  
      res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

// Actualizar un registro
export const updateUser = async (req, res) => {
  try {
    await usuarios_.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({
      message: "El registro fue actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Eliminar un registro
export const deleteUser = async (req, res) => {
  try {
    await usuarios_.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "El registro fue eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
