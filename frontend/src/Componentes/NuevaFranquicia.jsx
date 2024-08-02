import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, FormGroup } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const URI = "http://localhost:8000/suites/create/";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const CompNuevaFranquicia = () => {
  //const { user } = useAuth(); // Obtener el usuario autenticado
  //useAuthRedirect(user); //Redirigir si no está autenticado
  const [nombre_completo, setNombreCompleto] = useState("");
  const [cedula_identidad, setCedulaDeIdentidad] = useState("");
  const [fecha_nac] = useState("");
  const [email_fr, setEmailFr] = useState("");
  const [pass_fr, setPassFr] = useState("");
  const [suite_fr, setSuiteFr] = useState("");
  const [activa, setActiva] = useState("");
  const navigate = useNavigate();

  //Procedimiento para guardar
  const store = async (e) => {
    e.preventDefault();
    await axios.post(URI, {
      nombre_completo: nombre_completo,
      cedula_identidad: cedula_identidad,
      fecha_nac: fecha_nac,
      email_fr: email_fr,
      pass_fr: pass_fr,
      suite_fr: suite_fr,
      activa: activa,
    });
    navigate("/menu/");
  };

  return (
    <ThemeProvider theme={theme}>
      <h3 className="d-flex justify-content-end fst-italic p-3 border shadow  rounded-2 bg-formTitles mb-4 ">
        Formulario de Ingreso de nueva Suite PM
      </h3>
      <form onSubmit={store}>
        <FormGroup>
          <TextField
            className="mb-3"
            label="Nombre Completo"
            value={nombre_completo}
            onChange={(e) => setNombreCompleto(e.target.value)}
          />

          <TextField
            className="mb-3"
            label="Cedula de Identidad"
            value={cedula_identidad}
            onChange={(e) => setCedulaDeIdentidad(e.target.value)}
            type="password"
          />

          <TextField
            className="mb-3"
            label="Email Franquicia"
            value={email_fr}
            onChange={(e) => setEmailFr(e.target.value)}
            type="email"
          />
          <TextField
            className="mb-3"
            label="Password Franquicia"
            value={pass_fr}
            onChange={(e) => setPassFr(e.target.value)}
            type="password"
          />
          <TextField
            className="mb-3"
            label="Numero de Suite"
            value={suite_fr}
            onChange={(e) => setSuiteFr(e.target.value)}
            type="text"
          />
          <TextField
            className="mb-3"
            label="Activa S/N"
            value={activa}
            onChange={(e) => setActiva(e.target.value)}
            type="text"
          />
          <button type="submit" className="btn btn-dark ">
            Guardar Informacion
          </button>
        </FormGroup>
      </form>
    </ThemeProvider>
    /*<div className="container bg-forms my-0">
      <h3 className="d-flex justify-content-end fst-italic p-3 border shadow  rounded-2 bg-formTitles ">
        Formulario de Ingreso de nueva Suite PM
      </h3>
      <form
        onSubmit={store}
        className="bg-dark shadow   p-3 rounded-3 mt-3 offset-lg-1 col-lg-8 col-md-8 col-sm-12"
      >
        <div className="mb-3 ">
          <label className="form-label">Nombre Completo</label>
          <input
            value={nombre_completo}
            onChange={(e) => setNombreCompleto(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label">Cédula de Identidad</label>
          <input
            value={cedula_identidad}
            onChange={(e) => setCedulaDeIdentidad(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label">Fecha de Nacimiento</label>
          <input
            value={fecha_nac}
            onChange={(e) => setFechaNac(e.target.value)}
            type="date"
            className="form-control"
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label">Email PM</label>
          <input
            value={email_fr}
            onChange={(e) => setEmailFr(e.target.value)}
            type="email"
            className="form-control"
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label">Password PM</label>
          <input
            value={pass_fr}
            onChange={(e) => setPassFr(e.target.value)}
            type="password"
            className="form-control"
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label">Suite PM</label>
          <input
            value={suite_fr}
            onChange={(e) => setSuiteFr(e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3 ">
          <label className="form-label">Activa?</label>
          <input
            value={activa}
            onChange={(e) => setActiva(e.target.value)}
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

export default CompNuevaFranquicia;
