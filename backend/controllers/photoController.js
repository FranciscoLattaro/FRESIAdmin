import path from 'path';
import { fileURLToPath } from 'url';

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getPhoto = (req, res) => {
    const { photoName } = req.params;
    const filePath = path.join(__dirname, '../uploads', photoName);

    res.sendFile(filePath, err => {
        if (err) {
            res.status(err.status || 500).send('No se pudo encontrar el archivo');
        }
    });
};
