import axios from "axios";
import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import BasicTableBimps from "./BasicTableBimps";
import { useAuth } from "./utils/AuthContext.js";
import useAuthRedirect from "./utils/useAuthRedirect.js";
import { Link } from "react-router-dom";

const URI = "http://localhost:8000/bimps/";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const CompMostrarBImp = () => {
  const [bimps, setBimps] = useState([]);
  const { user } = useAuth(); // Obtener el usuario autenticado
  useAuthRedirect(user); //Redirigir si no está autenticado

  useEffect(() => {
    getBimps();
  }, []);

  const getBimps = async () => {
    try {
      const res = await axios.get(URI);
      setBimps(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteBimps = async (id) => {
    try {
      await axios.delete(`${URI}${id}`);
      getBimps(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  

  return (
    <div className="container w-100">
      <h3 className="d-flex justify-content-end fst-italic p-3 border shadow rounded-2 bg-formTitles">
        Historial de Importaciones (Básicas)
      </h3>
      <BasicTableBimps rows={bimps} deleteRow={deleteBimps} />

      <Button
        className="mt-2  "
        variant="contained"
        component={Link}
        sx={{
          backgroundColor: "#000000",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "darkgrey",
            color: "black",
          },
        }}
        to={`/bimps/create`}
        startIcon={<AddIcon />}
      >
        Ingresar nueva Importación (B)
      </Button>
    </div>
  );
};

export default CompMostrarBImp;
