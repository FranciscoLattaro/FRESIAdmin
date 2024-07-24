import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";

const URI = "http://localhost:8000/track/";

const CompTrackings = () => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getRows();
  }, []);

  //Procedimiento para mostrar todos los blogs
  const getRows = async () => {
    const res = await axios.get(URI);
    setRows(res.data);
  };

  //Procedimiento para eliminar un blog
  const deleteBlog = async (id) => {
    await axios.delete(`${URI}${id}`);
    getRows();
  };

  return (
    <div className="containter ">
      <h3 className="d-flex justify-content-end fst-italic p-3 border shadow  rounded-2 bg-formTitles">
        Historial de Tracking
      </h3>
      <div className="row border border-dark rounded-3 mt-3 shadow p-2 bg-forms ">
        <div className="col overflow-scroll">
          <a href={`/track/create`} className="btn shadow mt-2 mb-2 crearReg ">
            <i className="fas fa-plus">
              <span className="crearReg ">Ingresar un nuevo Tracking</span>
            </i>
          </a>
          <table className="table border border-dark  ">
            <thead className="table-dark">
              <tr>
                <th>id</th>
                <th>emp_trans</th>
                <th>tracking_ext</th>
                <th>tracking_unique</th>
                <th>id_Franquicia</th>
                <th>id_EImportacion</th>
                <th>id_estado</th>
                <th>createdAt</th>
                <th>updatedAt</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.emp_trans}</td>
                  <td>{row.tracking_ext}</td>
                  <td>{row.tracking_unique}</td>
                  <td>{row.id_Franquicia}</td>
                  <td>{row.id_EImportacion}</td>
                  <td>{row.id_estado}</td>
                  <td>{row.createdAt}</td>
                  <td>{row.updatedAt}</td>
                  <td>
                    <a
                      href={
                        "/fedex/tracking/" +
                        row.tracking_ext +
                        "/" +
                        row.tracking_unique
                      }
                      className="btn  btn-dark shadow mx-1 "
                    >
                      <span className="fuente1"> Ver Tracking</span>
                    </a>

                    <button
                      onClick={() => deleteBlog(row.id)}
                      className="btn btn-outline-danger shadow "
                    >
                      <span className=""> Eliminar Registro</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompTrackings;
