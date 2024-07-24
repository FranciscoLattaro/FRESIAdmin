import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";

const BasicTableTracking = ({ rows, deleteTracking }) => {
  // Verifica si rows es un arreglo
  if (!Array.isArray(rows)) {
    return <div>Error: los datos no son un arreglo</div>;
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Empresa de Transporte</TableCell>
            <TableCell>Tracking</TableCell>
            <TableCell>Franquicia Asociada</TableCell>
            <TableCell>Id de importación específica</TableCell>
            <TableCell>Estado de Tracking</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.emp_trans}</TableCell>
              <TableCell>{row.tracking_unique}</TableCell>
              <TableCell>{row.id_Franquicia}</TableCell>
              <TableCell>{row.id_EImportacion}</TableCell>
              <TableCell>{row.id_estado}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.updatedAt}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteTracking(row.id)}
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

export default BasicTableTracking;
