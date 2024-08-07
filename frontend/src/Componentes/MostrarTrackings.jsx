import axios from "axios";
import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import BasicTableTracking from "./BasicTableTracking.jsx";
import { useAuth } from "./utils/AuthContext.js";
import useAuthRedirect from "./utils/useAuthRedirect.js";
import { Link } from "react-router-dom";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";  // Importar dayjs

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const CompMostrarTrackings = () => {
  const [trackings, setTrackings] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchEmpresa, setSearchEmpresa] = useState("");
  const [searchTracking, setSearchTracking] = useState("");
  const [searchFranquicia, setSearchFranquicia] = useState("");
  const [searchEstado, setSearchEstado] = useState("");
  const [searchImportacionId, setSearchImportacionId] = useState("");

  const { user } = useAuth(); // Obtener el usuario autenticado
  useAuthRedirect(user); //Redirigir si no está autenticado

  useEffect(() => {
    getTrackings();
  }, []);

  const getTrackings = async () => {
    try {
      const res = await axios.get("http://localhost:8000/track/");
      setTrackings(res.data);
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

  const filterByDateRange = (items) => {
    if (!startDate || !endDate) return items;
    return items.filter((item) => {
      const itemDate = dayjs(item.createdAt);
      return itemDate.isBetween(dayjs(startDate), dayjs(endDate), 'day', '[]');
    });
  };

  const filterByEmpresa = (items) => {
    if (!searchEmpresa) return items;
    return items.filter((item) =>
      item.empresa.toLowerCase().includes(searchEmpresa.toLowerCase())
    );
  };

  const filterByTracking = (items) => {
    if (!searchTracking) return items;
    return items.filter((item) =>
      item.tracking.toLowerCase().includes(searchTracking.toLowerCase())
    );
  };

  const filterByFranquicia = (items) => {
    if (!searchFranquicia) return items;
    return items.filter((item) =>
      item.franquicia.toLowerCase().includes(searchFranquicia.toLowerCase())
    );
  };

  const filterByEstado = (items) => {
    if (!searchEstado) return items;
    return items.filter((item) =>
      item.estado.toLowerCase().includes(searchEstado.toLowerCase())
    );
  };

  const filterByImportacionId = (items) => {
    if (!searchImportacionId) return items;
    return items.filter((item) =>
      item.importacionId.toString().includes(searchImportacionId)
    );
  };

  const applyFilters = (items) => {
    let filteredItems = filterByDateRange(items);
    filteredItems = filterByEmpresa(filteredItems);
    filteredItems = filterByTracking(filteredItems);
    filteredItems = filterByFranquicia(filteredItems);
    filteredItems = filterByEstado(filteredItems);
    filteredItems = filterByImportacionId(filteredItems);
    return filteredItems;
  };

  const filteredTrackings = applyFilters(trackings);

  return (
    <ThemeProvider theme={theme}>
      <div className="container mt-0 w-100">
        <Accordion >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Filtros</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="display-flex align-items-center flex-wrap" style={{ gap: '20px' }}>
              <TextField
                label="Desde"
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
              />
              <TextField
                label="Hasta"
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
              />
              <TextField
                label="Empresa de Transporte"
                value={searchEmpresa}
                onChange={(e) => setSearchEmpresa(e.target.value)}
                style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
              />
              <TextField
                label="Tracking"
                value={searchTracking}
                onChange={(e) => setSearchTracking(e.target.value)}
                style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
              />
              <TextField
                label="Franquicia Asociada"
                value={searchFranquicia}
                onChange={(e) => setSearchFranquicia(e.target.value)}
                style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
              />
              <TextField
                label="Estado de Tracking"
                value={searchEstado}
                onChange={(e) => setSearchEstado(e.target.value)}
                style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
              />
              <TextField
                label="ID de Importación Específica"
                value={searchImportacionId}
                onChange={(e) => setSearchImportacionId(e.target.value)}
                style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <BasicTableTracking  rows={filteredTrackings} deleteTracking={deleteTracking} />
        <Button
          component={Link}
          className="mt-2"
          variant="contained"
          sx={{
            backgroundColor: "success",
            color: "#FFFFFF",
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
