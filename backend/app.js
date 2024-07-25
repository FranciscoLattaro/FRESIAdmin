import express from "express"
import cors from 'cors'
//Importar la conexion a la DB
import db from "./database/db.js"
//Importar enrutador
import routes from "./routes/routes.js";
import path from 'path';
import { fileURLToPath } from 'url';

//Instanciamos express para la creación de nuestro servidor
const app = express();

app.use( cors())
app.use(express.urlencoded({extended: false})); 
app.use(express.json());   

app.use('/', routes)

// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurar el middleware para servir archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'backend/uploads')));

try {
    db.authenticate
    console.log('Conexion exitosa a la DB')
} catch (error) {
    console.log('El error de conexion es: ${error}')
}

// Configurar el middleware para servir archivos estáticos desde el directorio 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'backend/uploads')));



let puerto = 8000

app.get('/', (req, res) => {
    res.send('Server UP! Listening on http://localhost:'+puerto)
})

app.listen(puerto, () => {
    console.log('Server UP! Listening on http://localhost:'+puerto) 
})