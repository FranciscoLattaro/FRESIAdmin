import detallecompras_ from "../models/detallecompras_.js";

// Mostrar todos los registros
export const getAllCompras = async (req, res) => {
  try {
    const bimps = await detallecompras_.findAll();
    res.json(bimps);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Mostrar un registro
export const getCompra = async (req, res) => {
  try {
    const row = await detallecompras_.findAll({
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
export const createCompra = async (req, res) => {
  try {
    await detallecompras_.create(req.body);
    res.json({
      message: "El registro fue creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Actualizar un registro
export const updateCompras = async (req, res) => {
  try {
    await detallecompras_.update(req.body, {
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
export const deleteCompras = async (req, res) => {
  try {
    await detallecompras_.destroy({
      where: { id: req.params.id },
    });
    res.json({
      message: "El registro fue eliminado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};
