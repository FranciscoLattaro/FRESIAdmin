import codigosregistro_ from "../models/bimportaciones_.js";

// Mostrar todos los registros
export const getAllCReg = async (req, res) => {
  try {
    const bimps = await codigosregistro_.findAll();
    res.json(bimps);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Mostrar un registro
export const getCReg = async (req, res) => {
  try {
    const row = await codigosregistro_.findAll({
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
export const createCReg = async (req, res) => {
  try {
    await codigosregistro_.create(req.body);
    res.json({
      message: "El registro fue creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Actualizar un registro
export const updateCReg = async (req, res) => {
  try {
    await codigosregistro_.update(req.body, {
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
export const deleteCReg = async (req, res) => {
  try {
    await codigosregistro_.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "El registro fue eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
