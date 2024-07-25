import multer from 'multer';
import path from 'path';
import filerecords from "../models/filerecord.js";

// Asegurarse de que el directorio `uploads` existe

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

export const upload = multer({ storage });

// Crear un registro
export const createFile = async (req, res) => {
  try {
    const { description, amount, currency } = req.body;
    const filePath = req.file ? req.file.path : null;
    await filerecords.create({ filePath, description, amount, currency });
    res.json({
      message: "El registro fue creado correctamente",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};


