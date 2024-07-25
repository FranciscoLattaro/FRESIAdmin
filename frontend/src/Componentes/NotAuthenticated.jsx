// src/pages/NotAuthenticated.jsx
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotAuthenticated = () => {

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>Oops! Parece que no has iniciado sesión</h1>
      
      <Button
        className="mt-2  "
        variant="contained"
        sx={{
          backgroundColor: "#000000",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "darkgrey",
            color: "black",
          },
        }}
        href={`/login`}
        
      >
       Ir a Inicio de Sesión
      </Button>
    </div>
  );
};

export default NotAuthenticated;