import axios from "axios";
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import BasicTableBimps from "./BasicTableBimps";
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import dayjs from "dayjs";  
const URI = "http://localhost:8000/bimps/";

const CompMostrarBImp = () => {
  const [bimps, setBimps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [emailShein, setEmailShein] = useState("");
  const [emailGoogle, setEmailGoogle] = useState("");
  const [idImportacion, setIdImportacion] = useState("");
  const [nroPedidoShein, setNroPedidoShein] = useState("");
  const { user } = useAuth(); // Obtener el usuario autenticado
  useAuthRedirect(user); //Redirigir si no está autenticado

  useEffect(() => {
    getBimps();
  }, []);

  const getBimps = async () => {
    try {
      const res = await axios.get(URI);
      setBimps(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
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
    filteredItems = filterByField(filteredItems, "emailShein", emailShein);
    filteredItems = filterByField(filteredItems, "emailGoogle", emailGoogle);
    filteredItems = filterByField(filteredItems, "idImportacion", idImportacion);
    filteredItems = filterByField(filteredItems, "nroPedidoShein", nroPedidoShein);
    return filteredItems;
  };

  const filteredBimps = applyFilters(bimps);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="container mt-0  w-100">
      <Accordion >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Filtros</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div className="display-flex align-items-center" style={{ marginBottom: "20px" }}>
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
              label="Email SHEIN"
              value={emailShein}
              onChange={(e) => setEmailShein(e.target.value)}
              style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
            />
            <TextField
              label="Email Google"
              value={emailGoogle}
              onChange={(e) => setEmailGoogle(e.target.value)}
              style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
            />
            <TextField
              label="ID Importación específica"
              value={idImportacion}
              onChange={(e) => setIdImportacion(e.target.value)}
              style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
            />
            <TextField
              label="Nro. pedido Shein"
              value={nroPedidoShein}
              onChange={(e) => setNroPedidoShein(e.target.value)}
              style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <BasicTableBimps rows={filteredBimps} deleteRow={deleteBimps} />
      <Button
        className="mt-2"
        variant="contained"
        component={Link}
        sx={{
          backgroundColor: "success",
          color: "#FFFFFF",
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
