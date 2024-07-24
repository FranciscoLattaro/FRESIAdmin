import express from "express";
import {
  getAllBImp,
  getBImp,
  createBImp,
  updateBImp,
  deleteBImp,
} from "../controllers/BImpController.js";
import {
  getAllEImp,
  getEImp,
  createEImp,
  updateEImp,
  deleteEImp,
} from "../controllers/EImpController.js";
import {
  getAllCReg,
  getCReg,
  createCReg,
  updateCReg,
  deleteCReg,
} from "../controllers/CodigoRegistro.js";
import {
  getAllFranq,
  getFranq,
  createFranq,
  updateFranq,
  deleteFranq,
} from "../controllers/Franquicias.js";
import {
  getAllTrackings,
  getTracking,
  createTracking,
  updateTracking,
  deleteTracking,
} from "../controllers/Trackings.js";
import { getTrackings, getToken } from "../apis/fedex.js";
import { login } from "../controllers/Login.js";
import {
  createFedExToken,
  getFedExToken,
  getAllFedExTokens,
} from "../controllers/FedExTokensController.js";
import {
  getAllCompras,
  getCompra,
  deleteCompras,
  createCompra,
  updateCompras,
} from "../controllers/DetalleCompras.js";
import { createUser, getAllUsers } from "../controllers/UsuariosController.js";

//Instanciamos el enrutador
const routes = express.Router();

//Rutas relacionadas al formulario BImportacion
routes.get("/bimps/", getAllBImp);
routes.get("/bimps/:id", getBImp);
routes.post("/bimps/create", createBImp);
routes.put("/bimps/:id", updateBImp);
routes.delete("/bimps/:id", deleteBImp);

//Rutas relacionadas al formulario EImportacion
routes.get("/eimps", getAllEImp);
routes.get("/eimps/:id", getEImp);
routes.post("/eimps/create", createEImp);
routes.put("/eimps/:id", updateEImp);
routes.delete("/eimps/:id", deleteEImp);

//Rutas relacionadas al formulario Detalle Compras
routes.get("/compras", getAllCompras);
routes.get("/compras/:id", getCompra);
routes.post("/compras/create", createCompra);
routes.put("/compras/:id", updateCompras);
routes.delete("/compras/:id", deleteCompras);

//Rutas relacionadas al formulario Franquicias
routes.get("/suites", getAllFranq);
routes.get("/suites/:id", getFranq);
routes.post("/suites/create", createFranq);
routes.put("/suites/:id", updateFranq);
routes.delete("/suites/:id", deleteFranq);

//Rutas relacionadas al Login
routes.post("/login/in", login, getAllBImp);

//Ruta para creacion de usuario
routes.post("/user/create", createUser);
routes.get("/user/all", getAllUsers);
//Rutas relacionadas al formulario Tracking
routes.get("/track/", getAllTrackings);
routes.get("/track/:id", getTracking);
routes.post("/track/create", createTracking);
routes.put("/track/:id", updateTracking);
routes.delete("/track/:id", deleteTracking);

//Rutas relacionadas a Tracking FedEx
routes.get("/fedExToken", getFedExToken);
routes.post("/fedex/tracking/:id/:unique", getTrackings);
routes.get("/fedex/getToken/", getToken);
routes.get("/tracking/tracking", getAllTrackings);

//Rutas relacionadas a Codigos Registro
routes.get("/allCodReg/", getAllCReg);
routes.post("/codReg/create", createCReg);
routes.delete("/codReg/delete/:id", deleteCReg);

export default routes;
