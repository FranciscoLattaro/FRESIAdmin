import eimportaciones_ from "../models/eimportaciones_.js";

// Mostrar todos los registros
export const getAllEImp = async (req, res) => {
  try {
    const eimps = await eimportaciones_.findAll();
    res.json(eimps);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Mostrar un registro
export const getEImp = async (req, res) => {
  try {
    const row = await eimportaciones_.findAll({
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
export const createEImp = async (req, res) => {
  try {
    await eimportaciones_.create(req.body);
    res.json({
      message: "El registro fue creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Actualizar un registro
export const updateEImp = async (req, res) => {
  try {
    await eimportaciones_.update(req.body, {
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
export const deleteEImp = async (req, res) => {
  try {
    await eimportaciones_.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "El registro fue eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
