import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router-dom";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("jwt_athorization");
    if (token) {
      try {
        const decoded = jwtDecode(token); // Usa jwt_decode aquí
        setUserName(decoded.name); // Asume que el nombre está en el payload del token
      } catch (err) {
        setUserName(""); // Token inválido o error en la decodificación
      }
    }
  }, []);

  return (
    <nav>
      <Link className="title" to="/">
        <LocalFloristIcon className="mx-2" sx={{ fontSize: 40 }} />
        FRESIAdmin
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : "closed"}>
        <li><NavLink to="/">Inicio</NavLink></li>
        <li><NavLink to="/bimps/">Historial de Importaciones (B)</NavLink></li>
        <li><NavLink to="/eimps/">Historial de Importaciones (E)</NavLink></li>
        <li><NavLink to="/suites/">Suites PM</NavLink></li>
        <li><NavLink to="/track/">Tracking</NavLink></li>
        <li><NavLink to="/">Facturas</NavLink></li>
        <li><NavLink to="/">Informes</NavLink></li>
        {userName && <li className="user-name">Hola, {userName}</li>}
      </ul>
    </nav>
  );
};

export default Navbar;
