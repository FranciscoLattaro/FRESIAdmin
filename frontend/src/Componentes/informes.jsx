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
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";

const Informe = () => {
  const [facturas, setFacturas] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchDescription, setSearchDescription] = useState("");
  const [searchAmount, setSearchAmount] = useState("");
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
      return itemDate.isAfter(dayjs(startDate)) && itemDate.isBefore(dayjs(endDate));
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
    return items.filter((item) => item.amount.toString().includes(searchAmount));
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
    const imageUrl = `http://localhost:8000/${filePath}`;
    window.open(imageUrl, "_blank");
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

        <div className="display-flex align-items-center" style={{ marginBottom: "20px" }}>
          <TextField
            label="Desde"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginRight: "20px", marginBottom: "10px", minWidth: "30vh" }}
          />
          <TextField
            label="Hasta"
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginRight: "20px", marginBottom: "10px", minWidth: "30vh" }}
          />
          <TextField
            label="Buscar por Descripción"
            value={searchDescription}
            onChange={(e) => setSearchDescription(e.target.value)}
            style={{ marginRight: "20px", minWidth: "30vh" }}
          />
          <TextField
            label="Buscar por Monto"
            value={searchAmount}
            onChange={(e) => setSearchAmount(e.target.value)}
            style={{ marginRight: "20px", minWidth: "30vh" }}
          />
        </div>
        

        <Typography variant="h6" gutterBottom>
          Facturas en Pesos Uruguayos
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Fecha de Creación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFacturas
              .filter((factura) => factura.currency === "UYU")
              .map((factura) => (
                <TableRow key={factura.id}>
                  <TableCell>{factura.description}</TableCell>
                  <TableCell>{factura.amount}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenImage(factura.filePath)}
                    >
                      Ver factura
                    </Button>
                  </TableCell>
                  <TableCell>{factura.createdAt}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Typography className="mt-3 text-end" variant="h6" gutterBottom>
          Total UYU: {totalNetoPesos.toFixed(2)}
        </Typography>

        <Typography variant="h6" gutterBottom>
          Facturas en Dólares
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Imagen</TableCell>
              <TableCell>Fecha de Creación</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredFacturas
              .filter((factura) => factura.currency === "USD")
              .map((factura) => (
                <TableRow key={factura.id}>
                  <TableCell>{factura.description}</TableCell>
                  <TableCell>{factura.amount}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenImage(factura.filePath)}
                    >
                      Ver factura
                    </Button>
                  </TableCell>
                  <TableCell>{factura.createdAt}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <Typography className="mt-3 text-end" variant="h6" gutterBottom>
          Total USD (conv. UYU): {totalNetoDolaresEnPesos.toFixed(2)}
        </Typography>
        <Typography className="mt-3 text-end" variant="h6" gutterBottom>
          Total: {totalNetoGlobalEnPesos.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Informe;
