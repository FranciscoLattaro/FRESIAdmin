import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, FormGroup } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuth } from "./utils/AuthContext.js";
import useAuthRedirect from "./utils/useAuthRedirect.js";

const URI = "http://localhost:8000/bimps/";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const CompEditarBImp = () => {
  const { user } = useAuth(); // Obtener el usuario autenticado
  useAuthRedirect(user); //Redirigir si no está autenticado

  const [email_shein, setEmailShein] = useState("");
  const [pass_shein, setPassShein] = useState("");
  const [email_google, setEmailGoogle] = useState("");
  const [pass_google, setPassGoogle] = useState("");
  const [nro_shein, setNroShein] = useState("");
  const [procesado, setProcesado] = useState("");
  const [id_EImportacion, setIdEImportacion] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // Obtener el id de la URL

  // Procedimiento para obtener los datos de la importación
  const getBImpById = async () => {
    const res = await axios.get(URI + id);
    setEmailShein(res.data.email_shein);
    setPassShein(res.data.pass_shein);
    setEmailGoogle(res.data.email_google);
    setPassGoogle(res.data.pass_google);
    setNroShein(res.data.nro_shein);
    setProcesado(res.data.procesado);
    setIdEImportacion(res.data.id_EImportacion);
  };

  useEffect(() => {
    getBImpById();
  }, []);

  // Procedimiento para actualizar
  const update = async (e) => {
    e.preventDefault();
    await axios.put(URI + id, {
      email_shein: email_shein,
      pass_shein: pass_shein,
      email_google: email_google,
      pass_google: pass_google,
      nro_shein: nro_shein,
      procesado: procesado,
      id_EImportacion: id_EImportacion,
    });
    navigate("/bimps");
  };

  return (
    <ThemeProvider theme={theme}>
      <h3 className="d-flex justify-content-end fst-italic p-3 border shadow rounded-2 bg-formTitles mb-4">
        Formulario de Edición de Importación - Básica
      </h3>
      <form onSubmit={update}>
        <FormGroup>
          <TextField
            className="mb-3"
            id="outlined-basic"
            label="Email Shein"
            variant="outlined"
            value={email_shein}
            onChange={(e) => setEmailShein(e.target.value)}
            type="text"
          />
          <TextField
            className="mb-3"
            id="outlined-basic"
            label="Pass Shein"
            variant="outlined"
            value={pass_shein}
            onChange={(e) => setPassShein(e.target.value)}
            type="text"
          />
          <TextField
            className="mb-3"
            id="outlined-basic"
            label="Email Google"
            variant="outlined"
            value={email_google}
            onChange={(e) => setEmailGoogle(e.target.value)}
            type="text"
          />
          <TextField
            className="mb-3"
            id="outlined-basic"
            label="Pass Google"
            variant="outlined"
            value={pass_google}
            onChange={(e) => setPassGoogle(e.target.value)}
            type="text"
          />
          <TextField
            className="mb-3"
            id="outlined-basic"
            label="Nro. Pedido Shein"
            variant="outlined"
            value={nro_shein}
            onChange={(e) => setNroShein(e.target.value)}
            type="text"
          />
          <TextField
            className="mb-3"
            id="outlined-basic"
            label="Procesado (Fecha)"
            variant="outlined"
            value={procesado}
            onChange={(e) => setProcesado(e.target.value)}
            type="text"
          />
          <TextField
            className="mb-3"
            id="outlined-basic"
            label="id_EImportacion"
            variant="outlined"
            value={id_EImportacion}
            onChange={(e) => setIdEImportacion(e.target.value)}
            type="text"
          />
          <button type="submit" className="btn btn-dark">
            Actualizar Información
          </button>
        </FormGroup>
      </form>
    </ThemeProvider>
  );
};

export default CompEditarBImp;
