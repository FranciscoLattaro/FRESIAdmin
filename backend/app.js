import express from "express"
import cors from 'cors'
//Importar la conexion a la DB
import db from "./database/db.js"
//Importar enrutador
import routes from "./routes/routes.js";

//Instanciamos express para la creación de nuestro servidor
const app = express();

app.use( cors())
app.use(express.urlencoded({extended: false})); 
app.use(express.json());   

app.use('/', routes)

try {
    db.authenticate
    console.log('Conexion exitosa a la DB')
} catch (error) {
    console.log('El error de conexion es: ${error}')
}

let puerto = 8000

app.get('/', (req, res) => {
    res.send('Server UP! Listening on http://localhost:'+puerto)
})

app.listen(puerto, () => {
    console.log('Server UP! Listening on http://localhost:'+puerto) 
})