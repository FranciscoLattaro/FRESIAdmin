import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Collapse,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link } from "react-router-dom";
import TablePagination from "@mui/material/TablePagination";

// Styled component for TableRow with margin
const StyledTableRow = styled(TableRow)({
  margin: "1em 0",
});

const BasicTableEimps = ({ rows, deleteEimps }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openRow, setOpenRow] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToggleRow = (id) => {
    setOpenRow(openRow === id ? null : id);
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
              <StyledTableRow>
                <TableCell />
                <TableCell>ID</TableCell>
                <TableCell>Franquicia</TableCell>
                <TableCell>Nros Shein</TableCell>
                <TableCell>Detalle Compra</TableCell>
                <TableCell>Tarjeta</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Updated At</TableCell>
                <TableCell>Acciones</TableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <React.Fragment key={row.id}>
                    <StyledTableRow>
                      <TableCell>
                        <IconButton
                          aria-label="expand row"
                          size="small"
                          onClick={() => handleToggleRow(row.id)}
                        >
                          {openRow === row.id ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>{row.franquicia}</TableCell>
                      <TableCell>{row.nros_shein}</TableCell>
                      <TableCell>{row.detalle_compra}</TableCell>
                      <TableCell>{row.tarjeta}</TableCell>
                      <TableCell>{row.createdAt.slice(0,10)}</TableCell>
                      <TableCell>{row.updatedAt.slice(0,10)}</TableCell>
                      <TableCell>
                        <Button
                          component={Link}
                          to={`/eimps/edit/${row.id}`} // Assuming edit route is /eimps/edit/:id
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
                          onClick={() => deleteEimps(row.id)}
                        >
                          <DeleteIcon />
                        </Button>
                      </TableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                      <TableCell
                        style={{ paddingBottom: 0, paddingTop: 0 }}
                        colSpan={9}
                      >
                        <Collapse
                          in={openRow === row.id}
                          timeout="auto"
                          unmountOnExit
                        >
                          <Box margin={1}>
                            <Typography
                              variant="h6"
                              gutterBottom
                              component="div"
                            >
                              Más Información
                            </Typography>
                            <Table size="small" aria-label="purchases">
                              <TableHead>
                                <TableRow>
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
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                <TableRow>
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
                                </TableRow>
                              </TableBody>
                            </Table>
                          </Box>
                        </Collapse>
                      </TableCell>
                    </StyledTableRow>
                  </React.Fragment>
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

export default BasicTableEimps;
