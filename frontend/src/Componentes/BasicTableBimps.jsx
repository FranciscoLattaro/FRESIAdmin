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
import EditIcon from "@mui/icons-material/Edit";

const BasicTableBimps = ({ rows, deleteFranq }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
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
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.email_shein}</TableCell>
              <TableCell>{row.pass_shein}</TableCell>
              <TableCell>{row.email_google}</TableCell>
              <TableCell>{row.pass_google}</TableCell>
              <TableCell>{row.nro_shein}</TableCell>
              <TableCell>{row.procesado}</TableCell>
              <TableCell>{row.id_EImportacion}</TableCell>
              <TableCell>{row.createdAt}</TableCell>
              <TableCell>{row.updatedAt}</TableCell>
              <TableCell>
                <Button
                  href={`/bimps/edit/${row.id}`}
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BasicTableBimps;
