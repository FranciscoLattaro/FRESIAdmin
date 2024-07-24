import franquicias_ from "../models/franquicias_.js";

// Mostrar todos los registros
export const getAllFranq = async (req, res) => {
  try {
    const franqs = await franquicias_.findAll();
    res.json(franqs);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Mostrar un registro
export const getFranq = async (req, res) => {
  try {
    const row = await franquicias_.findAll({
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
export const createFranq = async (req, res) => {
  try {
    await franquicias_.create(req.body);
    res.json({
      message: "El registro fue creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Actualizar un registro
export const updateFranq = async (req, res) => {
  try {
    await franquicias_.update(req.body, {
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
export const deleteFranq = async (req, res) => {
  try {
    await franquicias_.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "El registro fue eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
