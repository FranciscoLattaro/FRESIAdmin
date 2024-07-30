import axios from "axios";
import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import BasicTableTracking from "./BasicTableBimps";
import { useAuth } from "./utils/AuthContext.js";
import useAuthRedirect from "./utils/useAuthRedirect.js";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const CompMostrarTrackings = () => {
  const [trackings, setTracking] = useState([]);
  const { user } = useAuth(); // Obtener el usuario autenticado
  useAuthRedirect(user); //Redirigir si no está autenticado

  useEffect(() => {
    getTrackings();
  }, []);

  const getTrackings = async () => {
    try {
      const res = await axios.get("http://localhost:8000/track/");
      setTracking(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteTracking = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/track/${id}`);
      getTrackings(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container w-100">
        {/*<h3 className="d-flex justify-content-end fst-italic p-3 border shadow rounded-2 bg-formTitles">
          Historial de Trackings
        </h3>*/}
        <BasicTableTracking rows={trackings} deleteTracking={deleteTracking} />
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
          to={`/track/create`}
          startIcon={<AddIcon />}
        >
          Ingresar Nuevo Tracking
        </Button>
      </div>
    </ThemeProvider>
  );
};

export default CompMostrarTrackings;
