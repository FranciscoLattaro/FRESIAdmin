import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const BasicTable = ({ rows, deleteFranq }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.nombre_completo}</TableCell>
              <TableCell>{row.cedula_identidad}</TableCell>
              <TableCell>{row.fecha_nac}</TableCell>
              <TableCell>{row.email_fr}</TableCell>
              <TableCell>{row.pass_fr}</TableCell>
              <TableCell>{row.suite_fr}</TableCell>
              <TableCell>{row.activa}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.updatedAt}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteFranq(row.id)}
                >
                  <DeleteIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTable;
