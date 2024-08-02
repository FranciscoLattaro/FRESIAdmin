import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, FormGroup } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const URI = "http://localhost:8000/bimps/create/";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const CompNuevaBImp = () => {
  const [email_shein, setEmailShein] = useState("");
  const [pass_shein, setPassShein] = useState("");
  const [email_google, setEmailGoogle] = useState("");
  const [pass_google, setPassGoogle] = useState("");
  const [nro_shein, setNroShein] = useState("");
  const [procesado, setProcesado] = useState("");
  const [id_EImportacion, setIdEImportacion] = useState("");
  const navigate = useNavigate();
  //const { user } = useAuth(); // Obtener el usuario autenticado
  //useAuthRedirect(user); //Redirigir si no está autenticado

  //Procedimiento para guardar
  const store = async (e) => {
    e.preventDefault();
    await axios.post(URI, {
      email_shein: email_shein,
      pass_shein: pass_shein,
      email_google: email_google,
      pass_google: pass_google,
      nro_shein: nro_shein,
      procesado: procesado,
      id_EImportacion: id_EImportacion,
    });
    navigate("/menu");
  };

  return (
    <ThemeProvider theme={theme}>
      <h3 className="d-flex justify-content-end fst-italic p-3 border shadow  rounded-2 bg-formTitles mb-4 ">
        Formulario de Ingreso de nueva Importación - Básica
      </h3>
      <form onSubmit={store}>
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
          <button type="submit" className="btn btn-dark ">
            Guardar Informacion
          </button>
        </FormGroup>
      </form>
    </ThemeProvider>

    /*
    <div className="container bg-forms my-0">
      <h3 className="d-flex justify-content-end fst-italic p-3 border shadow  rounded-2 bg-formTitles ">
        Formulario de Ingreso de nueva Importación - Básica
      </h3>
      <form
        onSubmit={store}
        className="bg-dark shadow   p-3 rounded-3 mt-3 offset-lg-1 col-lg-8 col-md-8 col-sm-12"
      >
        <div className="mb-3 ">
          <label className="form-label">Email Shein</label>
          <input
            value={email_shein}
            onChange={(e) => setEmailShein(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label">Pass Shein</label>
          <input
            value={pass_shein}
            onChange={(e) => setPassShein(e.target.value)}
            type="password"
            className="form-control"
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label">Email Google</label>
          <input
            value={email_google}
            onChange={(e) => setEmailGoogle(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label">Pass Google</label>
          <input
            value={pass_google}
            onChange={(e) => setPassGoogle(e.target.value)}
            type="password"
            className="form-control"
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label">Nro. Pedido Shein</label>
          <input
            value={nro_shein}
            onChange={(e) => setNroShein(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label">Procesado S/N</label>
          <input
            value={procesado}
            onChange={(e) => setProcesado(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label">id_EImportacion</label>
          <input
            value={id_EImportacion}
            onChange={(e) => setIdEImportacion(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-success">
          Guardar Informacion
        </button>
      </form>
    </div>*/
  );
};

export default CompNuevaBImp;
