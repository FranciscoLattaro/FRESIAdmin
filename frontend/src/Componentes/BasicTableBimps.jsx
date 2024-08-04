import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";

const BasicTableBimps = ({ rows, deleteRow }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate empty rows
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className="container w-100">
      <div className="row">
        <TableContainer className="col-12" component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ m: 1 }}>
                <TableCell>ID</TableCell>
                <TableCell>Email Shein</TableCell>
                <TableCell>Password Shein</TableCell>
                <TableCell>Email Google</TableCell>
                <TableCell>Password Google</TableCell>
                <TableCell>Nro. pedido de Shein</TableCell>
                <TableCell>Procesado (Fecha)</TableCell>
                <TableCell>id Importacion Específica</TableCell>
                <TableCell>Creado en</TableCell>
                <TableCell>Actualizado en</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id} sx={{ m: 0 }}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.email_shein}</TableCell>
                    <TableCell>{row.pass_shein}</TableCell>
                    <TableCell>{row.email_google}</TableCell>
                    <TableCell>{row.pass_google}</TableCell>
                    <TableCell>{row.nro_shein}</TableCell>
                    <TableCell>{row.procesado}</TableCell>
                    <TableCell>{row.id_EImportacion}</TableCell>
                    <TableCell>{row.createdAt.slice(0,10)}</TableCell>
                    <TableCell>{row.updatedAt.slice(0,10)}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/bimps/edit/${row.id}`}
                        variant="contained"
                        color="primary"
                        style={{
                          marginRight: "10px",
                          backgroundColor: "black",
                          marginBottom: ".5em",
                        }}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => deleteRow(row.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 20 * emptyRows }}>
                  <TableCell colSpan={11} />
                </TableRow>
              )}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </div>
  );
};

export default BasicTableBimps;
