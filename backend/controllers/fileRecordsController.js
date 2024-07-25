import filerecords from "../models/filerecord.js";

// Mostrar todos los registros
export const getAllFiles = async (req, res) => {
  try {
    const files = await filerecords.findAll();
    res.json(files);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Mostrar un registro
export const getFile = async (req, res) => {
  try {
    const row = await filerecords.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.json(row[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Crear un registro
export const createFile = async (req, res) => {
  try {
    await filerecords.create(req.body);
    res.json({
      message: "El registro fue creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Actualizar un registro
export const updateFile = async (req, res) => {
  try {
    await filerecords.update(req.body, {
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
export const deleteFile = async (req, res) => {
  try {
    await filerecords.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "El registro fue eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
