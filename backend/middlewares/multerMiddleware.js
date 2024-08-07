import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import filerecords from "../models/filerecord.js";

// Obtener el directorio actual usando `fileURLToPath` y `import.meta.url`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Definir el directorio de subidas
const uploadsDir = path.join( );

// Asegurarse de que el directorio `uploads` existe
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
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
