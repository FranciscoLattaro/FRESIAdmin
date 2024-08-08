import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import ReceiptIcon from "@mui/icons-material/Receipt";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import FileDownloadIcon from '@mui/icons-material/FileDownload';


const Informe = () => {
  const [facturas, setFacturas] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [searchAmount, setSearchAmount] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const conversionRate = 40; // Suponiendo una tasa de conversión de 1 USD a 40 UYU

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const facturasResponse = await axios.get(
          "http://localhost:8000/facturas"
        );
        setFacturas(facturasResponse.data);
      } catch (error) {
        console.error("Error fetching facturas:", error);
      }
    };

    const fetchGastos = async () => {
      try {
        const gastosResponse = await axios.get("http://localhost:8000/gastos");
        setGastos(gastosResponse.data);
      } catch (error) {
        console.error("Error fetching gastos:", error);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await fetchFacturas();
      await fetchGastos();
      setLoading(false);
    };

    fetchData();
  }, []);

  const filterByDateRange = (items) => {
    if (!startDate || !endDate) return items;
    return items.filter((item) => {
      const itemDate = dayjs(item.createdAt);
      return (
        itemDate.isAfter(dayjs(startDate)) && itemDate.isBefore(dayjs(endDate))
      );
    });
  };

  const filterByDescription = (items) => {
    if (!searchDescription) return items;
    return items.filter((item) =>
      item.description.toLowerCase().includes(searchDescription.toLowerCase())
    );
  };

  const filterByAmount = (items) => {
    if (!searchAmount) return items;
    return items.filter((item) =>
      item.amount.toString().includes(searchAmount)
    );
  };

  const applyFilters = (items) => {
    let filteredItems = filterByDateRange(items);
    filteredItems = filterByDescription(filteredItems);
    filteredItems = filterByAmount(filteredItems);
    return filteredItems;
  };

  const filteredFacturas = applyFilters(facturas);
  const filteredGastos = applyFilters(gastos);

  const calculateTotal = (items, currency) => {
    const totalFacturas = items
      .filter((item) => item.currency === currency)
      .reduce((sum, item) => sum + parseFloat(item.amount), 0);
    return totalFacturas;
  };

  const handleOpenImage = (filePath) => {
    const imageUrl = `http://localhost:8000/uploads/${filePath}`;
    console.log(imageUrl)
    window.open(imageUrl, "_blank");
  };

  const exportPDF = () => {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [["Descripción", "Monto", "Fecha de Creación", "Moneda"]],
    body: [
      ...filteredFacturas.map((factura) => [
        factura.description,
        factura.amount,
        factura.createdAt.slice(0, 10),
        factura.currency,
      ]),
      [
        "Total Neto en Pesos Uruguayos",
        totalNetoPesos,
        "",
        "UYU",
      ],
      [
        "Total Neto en Dólares Americanos",
        totalNetoDolares,
        "",
        "USD",
      ],
      [
        "Total Neto en Pesos Uruguayos (Convertido)",
        totalNetoDolaresEnPesos,
        "",
        "UYU",
      ],
      [
        "Total Neto Global en Pesos Uruguayos",
        totalNetoGlobalEnPesos,
        "",
        "UYU",
      ],
    ],
  });
  doc.save("facturas.pdf");
};


  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredFacturas.map((factura) => ({
        Descripción: factura.description,
        Monto: factura.amount,
        "Fecha de Creación": factura.createdAt.slice(0, 10),
        Moneda: factura.currency,
      })),
      {
        Descripción: "Total Neto en Pesos Uruguayos",
        Monto: totalNetoPesos,
        "Fecha de Creación": "",
        Moneda: "UYU",
      },
      {
        Descripción: "Total Neto en Dólares Americanos",
        Monto: totalNetoDolares,
        "Fecha de Creación": "",
        Moneda: "USD",
      },
      {
        Descripción: "Total Neto en Pesos Uruguayos (Convertido)",
        Monto: totalNetoDolaresEnPesos,
        "Fecha de Creación": "",
        Moneda: "UYU",
      },
      {
        Descripción: "Total Neto Global en Pesos Uruguayos",
        Monto: totalNetoGlobalEnPesos,
        "Fecha de Creación": "",
        Moneda: "UYU",
      },
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Facturas");
    XLSX.writeFile(workbook, "facturas.xlsx");
  };

  const handleExport = (type) => {
    setOpenDialog(false);
    if (type === "pdf") {
      exportPDF();
    } else if (type === "excel") {
      exportExcel();
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  const totalNetoPesos = calculateTotal(filteredFacturas, "UYU");
  const totalNetoDolares = calculateTotal(filteredFacturas, "USD");
  const totalNetoDolaresEnPesos = totalNetoDolares * conversionRate;
  const totalNetoGlobalEnPesos = totalNetoPesos + totalNetoDolaresEnPesos;

  return (
    <Card className="mb-5">
      <CardContent>
        <Typography variant="h4" className="text-end mb-5" gutterBottom>
          Informe de Facturas y Gastos
        </Typography>

        <div
          className="display-flex align-items-center"
          style={{ margin: "0 20px 20px 20px" }}
        >
          <TextField
            label="Desde"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            style={{
              marginRight: "20px",
              marginBottom: "10px",
              minWidth: "20vh",
              maxWidth: "20vh",
            }}
          />
          <TextField
            label="Hasta"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            style={{
              marginRight: "20px",
              marginBottom: "10px",
              minWidth: "20vh",
              maxWidth: "20vh",
            }}
          />
          <TextField
            label="Buscar por Descripción"
            value={searchDescription}
            onChange={(e) => setSearchDescription(e.target.value)}
            style={{
              marginRight: "20px",
              marginBottom: "10px",
              minWidth: "20vh",
              maxWidth: "20vh",
            }}
          />
          <TextField
            label="Buscar por Monto"
            value={searchAmount}
            onChange={(e) => setSearchAmount(e.target.value)}
            style={{
              marginRight: "20px",
              marginBottom: "10px",
              minWidth: "20vh",
              maxWidth: "20vh",
            }}
          />
        </div>

        <div className="display-flex text-end">
          <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenDialog(true)}
          style={{ marginBottom: "20px" }}
          startIcon={<FileDownloadIcon/>}
        >
          Exportar
        </Button>
        </div>
        

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Exportar Datos</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Por favor, elija el formato de exportación.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleExport("pdf")} color="primary">
              PDF
            </Button>
            <Button onClick={() => handleExport("excel")} color="primary">
              Excel
            </Button>
            <Button onClick={() => setOpenDialog(false)} color="primary">
              Cancelar
            </Button>
          </DialogActions>
        </Dialog>

        <Typography variant="h6" gutterBottom>
          Facturas en Pesos Uruguayos
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Imagen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFacturas
              .filter((factura) => factura.currency === "UYU")
              .map((factura) => (
                <TableRow key={factura.id}>
                  <TableCell>{factura.description}</TableCell>
                  <TableCell>{factura.amount}</TableCell>
                  <TableCell>{factura.createdAt.slice(0, 10)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      // Ruta del archivo
                      onClick={() => handleOpenImage(factura.filePath.split('\\').pop())}
                      startIcon={<ReceiptIcon />}
                    >
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Typography variant="h6" className="mt-5 text-end" gutterBottom>
          Total Neto en Pesos Uruguayos: {totalNetoPesos}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Facturas en Dólares Americanos
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Fecha de Creación</TableCell>
              <TableCell>Imagen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFacturas
              .filter((factura) => factura.currency === "USD")
              .map((factura) => (
                <TableRow key={factura.id}>
                  <TableCell>{factura.description}</TableCell>
                  <TableCell>{factura.amount}</TableCell>
                  <TableCell>{factura.createdAt.slice(0, 10)}</TableCell>
                  <TableCell>
                  <Button
                      variant="outlined"
                      color="primary"
                      // Ruta del archivo
                      onClick={() => handleOpenImage(factura.filePath.split('\\').pop())}
                      startIcon={<ReceiptIcon />}
                    >
                      Ver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Typography variant="h6" className="mt-5 text-end" gutterBottom>
          Total Neto en Dólares Americanos: {totalNetoDolares}
        </Typography>
        <Typography variant="h6" className="text-end" gutterBottom>
          Total Neto en Pesos Uruguayos (Convertido): {totalNetoDolaresEnPesos}
        </Typography>
        <Typography variant="h6" className="text-end" gutterBottom>
          Total Neto Global en Pesos Uruguayos: {totalNetoGlobalEnPesos}
        </Typography>

        
      </CardContent>
    </Card>
  );
};

export default Informe;
