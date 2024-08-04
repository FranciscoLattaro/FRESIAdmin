import React, { useState } from "react";
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
import TablePagination from "@mui/material/TablePagination";
import { Link } from "react-router-dom";

// Styled component for TableRow with margin
const StyledTableRow = styled(TableRow)({
  margin: "1em 0",
});

const BasicTableTracking = ({ rows, deleteTracking }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Calculate empty rows for pagination
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className="container w-100">
      <div className="row">
        <TableContainer className="col-12" component={Paper}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <StyledTableRow>
                <TableCell>ID</TableCell>
                <TableCell>Empresa de Transporte</TableCell>
                <TableCell>Tracking</TableCell>
                <TableCell>Franquicia Asociada</TableCell>
                <TableCell>Id de importación específica</TableCell>
                <TableCell>Estado de Tracking</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Acciones</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <StyledTableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.emp_trans}</TableCell>
                    <TableCell>{row.tracking_unique}</TableCell>
                    <TableCell>{row.id_Franquicia}</TableCell>
                    <TableCell>{row.id_EImportacion}</TableCell>
                    <TableCell>{row.id_estado}</TableCell>
                    <TableCell>{row.createdAt.slice(0,10)}</TableCell>
                    <TableCell>{row.updatedAt.slice(0,10)}</TableCell>
                    <TableCell>
                      <Button
                        component={Link}
                        to={`/tracking/edit/${row.id}`} // Assuming edit route is /tracking/edit/:id
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
                        onClick={() => deleteTracking(row.id)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </StyledTableRow>
                ))}
              {emptyRows > 0 && (
                <StyledTableRow style={{ height: 20 * emptyRows }}>
                  <TableCell colSpan={9} />
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

export default BasicTableTracking;
