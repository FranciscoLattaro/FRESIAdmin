import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
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
import "./estilos.css";

// Styled component for TableRow with margin
const StyledTableRow = styled(TableRow)({
  margin: "1em 0",
});

const BasicTable = ({ rows, deleteFranq }) => {
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
    <div className="container mt-0 w-100">
      <div className="row ">
        <TableContainer className="col-12" component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre Completo</TableCell>
                <TableCell>Cédula Identidad</TableCell>
                <TableCell>Fecha de Nacimiento</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Pass</TableCell>
                <TableCell>Suite</TableCell>
                <TableCell>Activa</TableCell>
                <TableCell>Creado en</TableCell>
                <TableCell>Actualizado en</TableCell>
                <TableCell>Acciones</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.nombre_completo}</TableCell>
                    <TableCell>{row.cedula_identidad}</TableCell>
                    <TableCell>{row.fecha_nac}</TableCell>
                    <TableCell>{row.email_fr}</TableCell>
                    <TableCell>{row.pass_fr}</TableCell>
                    <TableCell>{row.suite_fr}</TableCell>
                    <TableCell>{row.activa}</TableCell>
                    <TableCell>{row.createdAt.slice(0,10)}</TableCell>
                    <TableCell>{row.updatedAt.slice(0,10)}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/edit/${row.id}`} // Assuming edit route is /edit/:id
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
                        onClick={() => deleteFranq(row.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </StyledTableRow>
                ))}
              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 20 * emptyRows }}>
                  <TableCell colSpan={11} />
                </StyledTableRow>
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

export default BasicTable;
