import axios from "axios";
import React, { useState, useEffect } from "react";
import BasicTable from "./BasicTable";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { useAuth } from "./utils/AuthContext.js";
import useAuthRedirect from "./utils/useAuthRedirect.js";
import { Link } from "react-router-dom";

const URI = "http://localhost:8000/suites/";

const CompMostrarFranquicias = () => {
  const [franqs, setFranqs] = useState([]);
  const [searchNombre, setSearchNombre] = useState("");
  const [searchCedula, setSearchCedula] = useState("");
  
  const { user } = useAuth(); // Obtener el usuario autenticado
  useAuthRedirect(user); //Redirigir si no está autenticado

  useEffect(() => {
    getFranqs();
  }, []);

  const getFranqs = async () => {
    try {
      const res = await axios.get(URI);
      setFranqs(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteFranq = async (id) => {
    try {
      await axios.delete(`${URI}${id}`);
      getFranqs(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const filterByNombre = (items) => {
    if (!searchNombre) return items;
    return items.filter((item) =>
      item.nombreCompleto.toLowerCase().includes(searchNombre.toLowerCase())
    );
  };

  const filterByCedula = (items) => {
    if (!searchCedula) return items;
    return items.filter((item) =>
      item.cedula.toLowerCase().includes(searchCedula.toLowerCase())
    );
  };

  const applyFilters = (items) => {
    let filteredItems = filterByNombre(items);
    filteredItems = filterByCedula(filteredItems);
    return filteredItems;
  };

  const filteredFranqs = applyFilters(franqs);

  return (
    <div className="container mb-5">
      <div className="display-flex align-items-center" style={{ marginBottom: "20px" }}>
        <TextField
          label="Nombre Completo"
          value={searchNombre}
          onChange={(e) => setSearchNombre(e.target.value)}
          style={{ marginRight: "20px", minWidth: "30vh" }}
        />
        <TextField
          label="Cédula"
          value={searchCedula}
          onChange={(e) => setSearchCedula(e.target.value)}
          style={{ marginRight: "20px", minWidth: "30vh" }}
        />
      </div>

      <BasicTable rows={filteredFranqs} deleteFranq={deleteFranq} />

      <Button
        component={Link}
        className="mt-2"
        variant="contained"
        sx={{
          backgroundColor: "success",
          color: "#FFFFFF",
          /*"&:hover": {
            backgroundColor: "darkgrey",
            color: "black",
          },*/
        }}
        to={`/suites/create`}
        startIcon={<AddIcon />}
      >
        Nueva Suite
      </Button>
    </div>
  );
};

export default CompMostrarFranquicias;
