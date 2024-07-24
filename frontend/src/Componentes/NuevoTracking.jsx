import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, FormGroup } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "./utils/AuthContext.js";
import useAuthRedirect from "./utils/useAuthRedirect.js";

const URI = "http://localhost:8000/track/create/";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const CompNuevoTracking = () => {
  //const { user } = useAuth(); // Obtener el usuario autenticado
  //useAuthRedirect(user); //Redirigir si no está autenticado
  const [emp_trans, setEmpTrans] = useState("");
  const [tracking_ext, setTrackExt] = useState("");
  const [tracking_unique, setTrackUnique] = useState("");
  const [id_Franquicia, setIdFranq] = useState("");
  const [id_EImportacion, setIdEImportacion] = useState("");
  const [id_estado, setIdEstado] = useState("");
  const navigate = useNavigate();

  // Procedimiento para guardar
  const store = async (e) => {
    e.preventDefault();
    await axios.post(URI, {
      emp_trans: emp_trans,
      tracking_ext: tracking_ext,
      tracking_unique: tracking_unique,
      id_Franquicia: id_Franquicia,
      id_EImportacion: id_EImportacion,
      id_estado: id_estado,
    });
    navigate("/track/");
  };

  return (
    <ThemeProvider theme={theme}>
      <h3 className="d-flex justify-content-end fst-italic p-3 border shadow rounded-2 bg-formTitles mb-4">
        Formulario de Ingreso de nuevo Tracking
      </h3>
      <form onSubmit={store}>
        <FormGroup>
          <TextField
            className="mb-3"
            label="Empresa de Transporte"
            value={emp_trans}
            onChange={(e) => setEmpTrans(e.target.value)}
          />
          <TextField
            className="mb-3"
            label="Nro. de Tracking"
            value={tracking_ext}
            onChange={(e) => setTrackExt(e.target.value)}
          />
          <TextField
            className="mb-3"
            label="Tracking Unique Id - FedEx"
            value={tracking_unique}
            onChange={(e) => setTrackUnique(e.target.value)}
          />
          <TextField
            className="mb-3"
            label="Franquicia"
            value={id_Franquicia}
            onChange={(e) => setIdFranq(e.target.value)}
          />
          <TextField
            className="mb-3"
            label="Id Importación - Específica"
            value={id_EImportacion}
            onChange={(e) => setIdEImportacion(e.target.value)}
          />
          <TextField
            className="mb-3"
            label="Estado"
            value={id_estado}
            onChange={(e) => setIdEstado(e.target.value)}
          />
          <button type="submit" className="btn btn-dark">
            Guardar Informacion
          </button>
        </FormGroup>
      </form>
    </ThemeProvider>
  );
};

export default CompNuevoTracking;
