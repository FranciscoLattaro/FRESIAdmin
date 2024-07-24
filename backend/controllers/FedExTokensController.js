import fedextokens_ from "../models/fedextokens_.js";

// Mostrar todos los registros
export const getAllFedExTokens = async (req, res) => {
  try {
    const tokens = await fedextokens_.findAll();
    res.json(tokens);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Mostrar un registro
export const getFedExToken = async (req, res) => {
  try {
    const row = await fedextokens_.findAll({
      where: {
        id: "1",
      },
    });
    res.json(row[0].token);
  } catch (error) {}
};

// Crear un registro
export const createFedExToken = async (req, res) => {
  try {
    await fedextokens_.create(req.body);
    res.json({
      message: "El registro fue creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Actualizar un registro
export const updateFedExToken = async (req, res) => {
  try {
    await fedextokens_.update(req.body, {
      where: { id: "1" },
    });
    res.json({
      message: "El registro fue actualizado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Eliminar un registro
export const deleteFedExToken = async (req, res) => {
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
