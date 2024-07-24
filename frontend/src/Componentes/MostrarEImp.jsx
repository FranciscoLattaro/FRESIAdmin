import axios from "axios";
import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import BasicTableEimps from "./BasicTableEimps";
import { useAuth } from "./utils/AuthContext.js";
import useAuthRedirect from "./utils/useAuthRedirect.js";
import { Link } from "react-router-dom";

const URI = "http://localhost:8000/eimps/";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const CompMostrarEImp = () => {
  const [eimps, setEimps] = useState([]);
  const { user } = useAuth(); // Obtener el usuario autenticado
  useAuthRedirect(user); //Redirigir si no está autenticado

  useEffect(() => {
    getEimps();
  }, []);

  const getEimps = async () => {
    try {
      const res = await axios.get(URI);
      if (Array.isArray(res.data)) {
        setEimps(res.data);
      } else {
        console.error("Expected an array but got:", res.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteEimps = async (id) => {
    try {
      await axios.delete(`${URI}${id}`);
      getEimps(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div>
      <h3 className="d-flex justify-content-end fst-italic p-3 border shadow rounded-2 bg-formTitles">
        Historial de Importaciones (Específica)
      </h3>
      <BasicTableEimps rows={eimps} deleteEimps={deleteEimps} />
      <Button
        component={Link}
        className="mt-2"
        variant="contained"
        sx={{
          backgroundColor: "#000000",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "darkgrey",
            color: "black",
          },
        }}
        to={`/eimps/create`}
        startIcon={<AddIcon />}
      >
        Ingresar nueva Importación (E)
      </Button>
    </div>
  );
};

export default CompMostrarEImp;
