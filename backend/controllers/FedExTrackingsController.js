import fedextracking_ from "../models/fedextracking_.js";

// Mostrar todos los registros
export const getAllFedExTrackings = async (req, res) => {
  try {
    const fedextrackings = await fedextracking_.findAll();
    res.json(fedextrackings);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Mostrar un registro
export const getFedExTracking = async (req, res) => {
  try {
    const row = await fedextracking_.findAll({
      where: {
        tracking_ext: req.params.tracking_ext,
      },
    });
    res.json(row[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Crear un registro
export const createFedExToken = async (req, res) => {
  try {
    await fedextracking_.create(req.body);
    res.json({
      message: "El registro fue creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Actualizar un registro
export const updateFedExTracking = async (req, res) => {
  try {
    await fedextracking_.update(req.body, {
      where: { tracking_ext: req.params.tracking_ext },
    });
    res.json({
      message: "El registro fue actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Eliminar un registro
export const deleteFedExtracking = async (req, res) => {
  try {
    await fedextokens_.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "El registro fue eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
