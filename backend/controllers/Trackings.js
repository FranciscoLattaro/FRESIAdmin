import tracking_ from "../models/tracking_.js";

// Mostrar todos los registros
export const getAllTrackings = async (req, res) => {
  try {
    const tracks = await tracking_.findAll();
    res.json(tracks);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Mostrar un registro
export const getTracking = async (req, res) => {
  try {
    const row = await tracking_.findAll({
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
export const createTracking = async (req, res) => {
  try {
    await tracking_.create(req.body);
    res.json({
      message: "El registro fue creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Actualizar un registro
export const updateTracking = async (req, res) => {
  try {
    await tracking_.update(req.body, {
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
export const deleteTracking = async (req, res) => {
  try {
    await tracking_.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "El registro fue eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
