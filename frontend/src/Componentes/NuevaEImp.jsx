import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-dropdown/style.css";
import {
  TextField,
  FormGroup,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const URI = "http://localhost:8000/eimps/create/";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const CompNuevaEImp = () => {
  //const { user } = useAuth(); // Obtener el usuario autenticado
  //useAuthRedirect(user); //Redirigir si no está autenticado
  const [franquicia, setFranquicia] = useState("");
  const [detalle_compra, setDetalleCompra] = useState("");
  const [tarjeta, setTarjeta] = useState("");
  const [tracking_1, setTracking1] = useState("");
  const [emp_tr_1, setEmpTr1] = useState("");
  const [estado_tracking_1, setEstadoTracking1] = useState("-");
  const [tracking_2, setTracking2] = useState("");
  const [emp_tr_2, setEmpTr2] = useState("");
  const [estado_tracking_2, setEstadoTracking2] = useState("-");
  const [tracking_3, setTracking3] = useState("");
  const [emp_tr_3, setEmpTr3] = useState("");
  const [estado_tracking_3, setEstadoTracking3] = useState("-");
  const [tracking_4, setTracking4] = useState("");
  const [emp_tr_4, setEmpTr4] = useState("");
  const [estado_tracking_4, setEstadoTracking4] = useState("-");
  const [tracking_5, setTracking5] = useState("");
  const [emp_tr_5, setEmpTr5] = useState("");
  const [estado_tracking_5, setEstadoTracking5] = useState("-");
  const options = [
    "Procesando",
    "Reembolsado",
    "Camino a Miami",
    "Camino a Uruguay",
    "En Uruguay",
  ];

  const navigate = useNavigate();

  //Procedimiento para guardar
  const store = async (e) => {
    e.preventDefault();
    await axios.post(URI, {
      franquicia: franquicia,
      detalle_compra: detalle_compra,
      tarjeta: tarjeta,
      tracking_1: tracking_1,
      emp_tr_1: emp_tr_1,
      estado_tracking_1: estado_tracking_1,
      tracking_2: tracking_2,
      emp_tr_2: emp_tr_2,
      estado_tracking_2: estado_tracking_2,
      tracking_3: tracking_3,
      emp_tr_3: emp_tr_3,
      estado_tracking_3: estado_tracking_3,
      tracking_4: tracking_4,
      emp_tr_4: emp_tr_4,
      estado_tracking_4: estado_tracking_4,
      tracking_5: tracking_5,
      emp_tr_5: emp_tr_5,
      estado_tracking_5: estado_tracking_5,
    });
    navigate("/eimps");
  };

  return (
    <ThemeProvider theme={theme}>
      <h3 className="d-flex justify-content-end fst-italic p-3 border shadow  rounded-2 bg-formTitles mb-4">
        Formulario de Ingreso de nueva Importación - Específica
      </h3>
      <form onSubmit={store}>
        <FormGroup className="mb-5">
          <TextField
            className="mb-3"
            label="Franquicia Asociada"
            value={franquicia}
            onChange={(e) => setFranquicia(e.target.value)}
          />
          <TextField
            className="mb-3"
            label="Detalle Compra"
            value={detalle_compra}
            onChange={(e) => setDetalleCompra(e.target.value)}
          />
          <TextField
            className="mb-3"
            label="Tarjeta Crédito/Débito Asociada"
            value={tarjeta}
            onChange={(e) => setTarjeta(e.target.value)}
          />
          <TextField
            className="mb-3"
            label="Tracking 1"
            value={tracking_1}
            onChange={(e) => setTracking1(e.target.value)}
          />
          <TextField
            className="mb-3"
            label="Empresa Tracking 1"
            value={emp_tr_1}
            onChange={(e) => setEmpTr1(e.target.value)}
          />
          <FormControl className="mb-3">
            <InputLabel>Estado Tracking 1</InputLabel>
            <Select
              value={estado_tracking_1}
              onChange={(e) => setEstadoTracking1(e.target.value)}
              label="Estado Tracking 1"
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className="mb-3"
            label="Tracking 2"
            value={tracking_2}
            onChange={(e) => setTracking2(e.target.value)}
          />
          <TextField
            className="mb-3"
            label="Empresa Tracking 2"
            value={emp_tr_2}
            onChange={(e) => setEmpTr2(e.target.value)}
          />
          <FormControl className="mb-3">
            <InputLabel>Estado Tracking 2</InputLabel>
            <Select
              value={estado_tracking_2}
              onChange={(e) => setEstadoTracking2(e.target.value)}
              label="Estado Tracking 2"
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className="mb-3"
            label="Tracking 3"
            value={tracking_3}
            onChange={(e) => setTracking3(e.target.value)}
          />
          <TextField
            className="mb-3"
            label="Empresa Tracking 3"
            value={emp_tr_3}
            onChange={(e) => setEmpTr3(e.target.value)}
          />
          <FormControl className="mb-3">
            <InputLabel>Estado Tracking 3</InputLabel>
            <Select
              value={estado_tracking_3}
              onChange={(e) => setEstadoTracking3(e.target.value)}
              label="Estado Tracking 3"
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className="mb-3"
            label="Tracking 4"
            value={tracking_4}
            onChange={(e) => setTracking4(e.target.value)}
          />
          <TextField
            className="mb-3"
            label="Empresa Tracking 4"
            value={emp_tr_4}
            onChange={(e) => setEmpTr4(e.target.value)}
          />
          <FormControl className="mb-3">
            <InputLabel>Estado Tracking 4</InputLabel>
            <Select
              value={estado_tracking_4}
              onChange={(e) => setEstadoTracking4(e.target.value)}
              label="Estado Tracking 4"
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className="mb-3"
            label="Tracking 5"
            value={tracking_5}
            onChange={(e) => setTracking5(e.target.value)}
          />
          <TextField
            className="mb-3"
            label="Empresa Tracking 5"
            value={emp_tr_5}
            onChange={(e) => setEmpTr5(e.target.value)}
          />
          <FormControl className="mb-3">
            <InputLabel>Estado Tracking 5</InputLabel>
            <Select
              value={estado_tracking_5}
              onChange={(e) => setEstadoTracking5(e.target.value)}
              label="Estado Tracking 5"
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <button type="submit" className="btn btn-dark ">
            Guardar Informacion
          </button>
        </FormGroup>
      </form>
    </ThemeProvider>
  );
};

export default CompNuevaEImp;
