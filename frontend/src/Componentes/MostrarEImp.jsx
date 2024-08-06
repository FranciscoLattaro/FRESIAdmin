import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import BasicTableEimps from "./BasicTableEimps";
import { useAuth } from "./utils/AuthContext.js";
import useAuthRedirect from "./utils/useAuthRedirect.js";
import { Link } from "react-router-dom";
import dayjs from "dayjs";  // Importar dayjs

const URI = "http://localhost:8000/eimps/";

const CompMostrarEImp = () => {
  const [eimps, setEimps] = useState([]);
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

  const filterByDateRange = (items) => {
    if (!startDate || !endDate) return items;
    return items.filter((item) => {
      const itemDate = dayjs(item.createdAt);
      return itemDate.isAfter(dayjs(startDate)) && itemDate.isBefore(dayjs(endDate));
    });
  };

  const filterById = (items) => {
    if (!searchId) return items;
    return items.filter((item) =>
      item.id.toString().includes(searchId)
    );
  };

  const filterByFranquicia = (items) => {
    if (!searchFranquicia) return items;
    return items.filter((item) =>
      item.franquicia.toLowerCase().includes(searchFranquicia.toLowerCase())
    );
  };

  const filterByNrosShein = (items) => {
    if (!searchNrosShein) return items;
    return items.filter((item) =>
      item.nrosShein.toLowerCase().includes(searchNrosShein.toLowerCase())
    );
  };

  const filterByDetalleCompra = (items) => {
    if (!searchDetalleCompra) return items;
    return items.filter((item) =>
      item.detalleCompra.toLowerCase().includes(searchDetalleCompra.toLowerCase())
    );
  };

  const filterByTarjeta = (items) => {
    if (!searchTarjeta) return items;
    return items.filter((item) =>
      item.tarjeta.toLowerCase().includes(searchTarjeta.toLowerCase())
    );
  };

  const applyFilters = (items) => {
    let filteredItems = filterByDateRange(items);
    filteredItems = filterById(filteredItems);
    filteredItems = filterByFranquicia(filteredItems);
    filteredItems = filterByNrosShein(filteredItems);
    filteredItems = filterByDetalleCompra(filteredItems);
    filteredItems = filterByTarjeta(filteredItems);
    return filteredItems;
  };

  const filteredEimps = applyFilters(eimps);

  return (
    <div className="container w-100">
      <div className="display-flex align-items-center" style={{ marginBottom: "20px" }}>
        <TextField
          label="Desde"
          type="datetime-local"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginRight: "20px", marginBottom: "10px", minWidth: "30vh" }}
        />
        <TextField
          label="Hasta"
          type="datetime-local"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
          style={{ marginRight: "20px", marginBottom: "10px", minWidth: "30vh" }}
        />
        <TextField
          label="ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ marginRight: "20px", minWidth: "30vh" }}
        />
        <TextField
          label="Franquicia"
          value={searchFranquicia}
          onChange={(e) => setSearchFranquicia(e.target.value)}
          style={{ marginRight: "20px", minWidth: "30vh" }}
        />
        <TextField
          label="Nros Shein"
          value={searchNrosShein}
          onChange={(e) => setSearchNrosShein(e.target.value)}
          style={{ marginRight: "20px", minWidth: "30vh" }}
        />
        <TextField
          label="Detalle Compra"
          value={searchDetalleCompra}
          onChange={(e) => setSearchDetalleCompra(e.target.value)}
          style={{ marginRight: "20px", minWidth: "30vh" }}
        />
        <TextField
          label="Tarjeta"
          value={searchTarjeta}
          onChange={(e) => setSearchTarjeta(e.target.value)}
          style={{ marginRight: "20px", minWidth: "30vh" }}
        />
      </div>

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
