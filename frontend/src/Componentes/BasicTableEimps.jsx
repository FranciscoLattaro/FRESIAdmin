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

const BasicTableEimps = ({ rows, deleteEimps }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Franquicia</TableCell>
            <TableCell>Nros Shein</TableCell>
            <TableCell>Detalle Compra</TableCell>
            <TableCell>Tarjeta</TableCell>
            <TableCell>Tracking 1</TableCell>
            <TableCell>Empresa Tracking 1</TableCell>
            <TableCell>Estado Tracking 1</TableCell>
            <TableCell>Tracking 2</TableCell>
            <TableCell>Empresa Tracking 2</TableCell>
            <TableCell>Estado Tracking 2</TableCell>
            <TableCell>Tracking 3</TableCell>
            <TableCell>Empresa Tracking 3</TableCell>
            <TableCell>Estado Tracking 3</TableCell>
            <TableCell>Tracking 4</TableCell>
            <TableCell>Empresa Tracking 4</TableCell>
            <TableCell>Estado Tracking 4</TableCell>
            <TableCell>Tracking 5</TableCell>
            <TableCell>Empresa Tracking 5</TableCell>
            <TableCell>Estado Tracking 5</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.franquicia}</TableCell>
              <TableCell>{row.nros_shein}</TableCell>
              <TableCell>{row.detalle_compra}</TableCell>
              <TableCell>{row.tarjeta}</TableCell>
              <TableCell>{row.tracking_1}</TableCell>
              <TableCell>{row.emp_tr_1}</TableCell>
              <TableCell>{row.estado_tracking_1}</TableCell>
              <TableCell>{row.tracking_2}</TableCell>
              <TableCell>{row.emp_tr_2}</TableCell>
              <TableCell>{row.estado_tracking_2}</TableCell>
              <TableCell>{row.tracking_3}</TableCell>
              <TableCell>{row.emp_tr_3}</TableCell>
              <TableCell>{row.estado_tracking_3}</TableCell>
              <TableCell>{row.tracking_4}</TableCell>
              <TableCell>{row.emp_tr_4}</TableCell>
              <TableCell>{row.estado_tracking_4}</TableCell>
              <TableCell>{row.tracking_5}</TableCell>
              <TableCell>{row.emp_tr_5}</TableCell>
              <TableCell>{row.estado_tracking_5}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.updatedAt}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deleteEimps(row.id)}
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

export default BasicTableEimps;
