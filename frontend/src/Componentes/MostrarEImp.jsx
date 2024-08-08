import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import BasicTableEimps from "./BasicTableEimps";
import { useAuth } from "./utils/AuthContext.js";
import useAuthRedirect from "./utils/useAuthRedirect.js";
import { Link } from "react-router-dom";
import {
  TextField,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import dayjs from "dayjs";

const URI = "http://localhost:8000/eimps/";

const CompMostrarEImp = () => {
  const [eimps, setEimps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchFranquicia, setSearchFranquicia] = useState("");
  const [searchNrosShein, setSearchNrosShein] = useState("");
  const [searchDetalleCompra, setSearchDetalleCompra] = useState("");
  const [searchTarjeta, setSearchTarjeta] = useState("");

  const { user } = useAuth(); // Obtener el usuario autenticado
  useAuthRedirect(user); // Redirigir si no está autenticado

  useEffect(() => {
    getEimps();
  }, []);

  const getEimps = async () => {
    try {
      const res = await axios.get(URI);
      setEimps(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
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

  const filterByDateRange = (items) => {
    if (!startDate || !endDate) return items;
    return items.filter((item) => {
      const itemDate = dayjs(item.createdAt);
      return itemDate.isAfter(dayjs(startDate)) && itemDate.isBefore(dayjs(endDate));
    });
  };

  const filterByField = (items, field, value) => {
    if (!value) return items;
    return items.filter((item) =>
      item[field].toLowerCase().includes(value.toLowerCase())
    );
  };

  const applyFilters = (items) => {
    let filteredItems = filterByDateRange(items);
    filteredItems = filterByField(filteredItems, "id", searchId);
    filteredItems = filterByField(filteredItems, "franquicia", searchFranquicia);
    filteredItems = filterByField(filteredItems, "nrosShein", searchNrosShein);
    filteredItems = filterByField(filteredItems, "detalleCompra", searchDetalleCompra);
    filteredItems = filterByField(filteredItems, "tarjeta", searchTarjeta);
    return filteredItems;
  };

  const filteredEimps = applyFilters(eimps);

  if (loading) {
    return <CircularProgress />;
  }

  return (
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
              label="ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
            />
            <TextField
              label="Franquicia"
              value={searchFranquicia}
              onChange={(e) => setSearchFranquicia(e.target.value)}
              style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
            />
            <TextField
              label="Nros Shein"
              value={searchNrosShein}
              onChange={(e) => setSearchNrosShein(e.target.value)}
              style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
            />
            <TextField
              label="Detalle Compra"
              value={searchDetalleCompra}
              onChange={(e) => setSearchDetalleCompra(e.target.value)}
              style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
            />
            <TextField
              label="Tarjeta"
              value={searchTarjeta}
              onChange={(e) => setSearchTarjeta(e.target.value)}
              style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <BasicTableEimps rows={filteredEimps} deleteEimps={deleteEimps} />
      <Button
        className="mt-2"
        variant="contained"
        component={Link}
        sx={{
          backgroundColor: "success",
          color: "#FFFFFF",
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
