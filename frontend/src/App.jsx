import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";

//Componentes
import CompMostrarBImp from "./Componentes/MostrarBImp.jsx";
import CompMostrarEImp from "./Componentes/MostrarEImp.jsx";
import CompNuevaBImp from "./Componentes/NuevaBImp.jsx";
import CompNuevaEImp from "./Componentes/NuevaEImp.jsx";
import CompMostrarFranquicias from "./Componentes/MostrarFranquicias.jsx";
import CompNuevaFranquicia from "./Componentes/NuevaFranquicia.jsx";
import Navbar from "./Componentes/NavBar/Navbar.jsx";
import CompNuevoTracking from "./Componentes/NuevoTracking.jsx";
import Login from "./Componentes/Login/Login.jsx";
import SignUp from "./Componentes/Login/SignUp.jsx";
import CompMostrarTrackings from "./Componentes/MostrarTrackings.jsx";
import CompEditarBImp from "./Componentes/EditarBImp.jsx"; // Importa tu componente de edición
import NotAuthenticated from "./Componentes/NotAuthenticated.jsx"
import Facturas from "./Componentes/Facturas.jsx";
import Informe from "./Componentes/informes.jsx";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navbar />}></Route>
        <Route path="/bimps/" element={<Navbar />}></Route>
        <Route path="/bimps/create" element={<Navbar />}></Route>
        <Route path="/eimps/" element={<Navbar />}></Route>
        <Route path="/eimps/create" element={<Navbar />}></Route>
        <Route path="/suites/" element={<Navbar />}></Route>
        <Route path="/suites/create" element={<Navbar />}></Route>
        <Route path="/track/" element={<Navbar />}></Route>
        <Route path="/track/create" element={<Navbar />}></Route>
        <Route path="/fedex/tracking/:id/:unique" element={<Navbar />}></Route>
        <Route path="/compras/" element={<Navbar />}></Route>
        <Route path="/bimps/edit/:id" element={<Navbar />}></Route>
        <Route path="/facturas/" element={<Navbar />}></Route>
        <Route path="/informes/" element={<Navbar />}></Route>
      </Routes>

      <div className="container">
        <div className="row">
          <div className="col">
            <Routes>
              <Route path="/" element={<CompMostrarBImp />}></Route>
              <Route path="/not-authenticated" element={<NotAuthenticated />}></Route>
              <Route path="/login/" element={<Login />}></Route>
              <Route path="/signUp/" element={<SignUp />}></Route>
              <Route path="/facturas/" element={<Facturas />}></Route>
              <Route path="/informes/" element={<Informe />}></Route>
              <Route path="/bimps/" element={<CompMostrarBImp />}></Route>
              <Route path="/bimps/create" element={<CompNuevaBImp />}></Route>
              <Route
                path="/bimps/edit/:id"
                element={<CompEditarBImp />}
              ></Route>

              <Route path="/eimps/" element={<CompMostrarEImp />}></Route>
              <Route path="/eimps/create" element={<CompNuevaEImp />}></Route>

              <Route
                path="/suites/"
                element={<CompMostrarFranquicias />}
              ></Route>
              <Route
                path="/suites/create"
                element={<CompNuevaFranquicia />}
              ></Route>

              <Route path="/track" element={<CompMostrarTrackings />}></Route>
              <Route
                path="/track/create"
                element={<CompNuevoTracking />}
              ></Route>
              <Route path="/tracking" element={<CompNuevoTracking />}></Route>
              <Route
                path="/fedex/tracking/:id/:unique"
                element={<CompMostrarTrackings />}
              ></Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;