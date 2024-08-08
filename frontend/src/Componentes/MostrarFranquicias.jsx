import axios from "axios";
import React, { useState, useEffect } from "react";
import BasicTable from "./BasicTable";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { useAuth } from "./utils/AuthContext.js";
import useAuthRedirect from "./utils/useAuthRedirect.js";
import { Link } from "react-router-dom";

const URI = "http://localhost:8000/suites/";

const CompMostrarFranquicias = () => {
  const [franqs, setFranqs] = useState([]);
  const [filteredFranqs, setFilteredFranqs] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [cedulaFilter, setCedulaFilter] = useState("");
  const { user } = useAuth(); // Obtener el usuario autenticado
  useAuthRedirect(user); // Redirigir si no está autenticado

  useEffect(() => {
    getFranqs();
  }, []);

  useEffect(() => {
    filterFranqs();
  }, [nameFilter, cedulaFilter, franqs]);

  const getFranqs = async () => {
    try {
      const res = await axios.get(URI);
      setFranqs(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filterFranqs = () => {
    const lowercasedNameFilter = nameFilter.toLowerCase();
    const lowercasedCedulaFilter = cedulaFilter.toLowerCase();

    const filtered = franqs.filter((franq) => {
      return (
        franq.nombre_completo.toLowerCase().includes(lowercasedNameFilter) &&
        franq.cedula_identidad.toLowerCase().includes(lowercasedCedulaFilter)
      );
    });
    
    setFilteredFranqs(filtered);
  };

  const deleteFranq = async (id) => {
    try {
      await axios.delete(`${URI}${id}`);
      getFranqs(); // Actualizar la lista después de eliminar
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  return (
    <div className="container mt-0 mb-5">
      <Accordion>
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
              label="Nombre Completo"
              variant="outlined"
              style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
              margin="normal"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
            <TextField
              label="Cédula de Identidad"
              variant="outlined"
              style={{ marginRight: "20px", marginBottom: "10px", minWidth: "20vh", maxWidth: "20vh" }}
              margin="normal"
              value={cedulaFilter}
              onChange={(e) => setCedulaFilter(e.target.value)}
            />
          </div>
        </AccordionDetails>
      </Accordion>
      <BasicTable rows={filteredFranqs} deleteFranq={deleteFranq} />
      <Button
        component={Link}
        className="mt-2"
        variant="contained"
        sx={{
          backgroundColor: "success",
          color: "#FFFFFF",
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
