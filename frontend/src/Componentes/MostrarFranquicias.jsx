import axios from "axios";
import React, { useState, useEffect } from "react";
import BasicTable from "./BasicTable";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "./utils/AuthContext.js";
import useAuthRedirect from "./utils/useAuthRedirect.js";
import { Link } from "react-router-dom";
const URI = "http://localhost:8000/suites/";

const CompMostrarFranquicias = () => {
  const [franqs, setFranqs] = useState([]);
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

  return (
    <div className="container mb-5">
      {/*<h3 className="d-flex justify-content-end fst-italic p-3 border shadow rounded-2 bg-formTitles">
        Historial de Suites
      </h3>*/}
      {/* <div className="row border border-dark rounded-3 mt-3 shadow p-2 bg-forms">
        <div className="col overflow-scroll">*/}

      <BasicTable rows={franqs} deleteFranq={deleteFranq} />

      <Button
        component={Link}
        className="mt-2  "
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
      {/* </div>
      </div> */}
    </div>
  );
};

export default CompMostrarFranquicias;
