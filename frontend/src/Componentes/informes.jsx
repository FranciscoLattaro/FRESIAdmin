import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const Informe = () => {
  const [facturas, setFacturas] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const conversionRate = 40; // Suponiendo una tasa de conversión de 1 USD a 40 UYU

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const facturasResponse = await axios.get('http://localhost:8000/facturas');
        setFacturas(facturasResponse.data);
      } catch (error) {
        console.error('Error fetching facturas:', error);
      }
    };

    const fetchGastos = async () => {
      try {
        const gastosResponse = await axios.get('http://localhost:8000/gastos');
        setGastos(gastosResponse.data);
      } catch (error) {
        console.error('Error fetching gastos:', error);
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

  const calculateTotal = (currency) => {
    const facturasFiltered = facturas.filter(factura => factura.currency === currency);
    const gastosFiltered = gastos.filter(gasto => gasto.currency === currency);
    const totalFacturas = facturasFiltered.reduce((sum, factura) => sum + parseFloat(factura.amount), 0);
    const totalGastos = gastosFiltered.reduce((sum, gasto) => sum + parseFloat(gasto.amount), 0);
    return totalFacturas - totalGastos;
  };

  const handleOpenImage = (filePath) => {
    const imageUrl = `http://localhost:8000/${filePath}`;
    window.open(imageUrl, '_blank');
  };

  if (loading) {
    return <CircularProgress />;
  }

  const totalNetoPesos = calculateTotal('UYU');
  const totalNetoDolares = calculateTotal('USD');
  const totalNetoDolaresEnPesos = totalNetoDolares * conversionRate;
  const totalNetoGlobalEnPesos = totalNetoPesos + totalNetoDolaresEnPesos;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Informe de Facturas y Gastos
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Facturas en Pesos Uruguayos
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Imagen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facturas.filter(factura => factura.currency === 'UYU').map((factura) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Typography className='mt-3' variant="h6" gutterBottom>
          Total Neto en Pesos Uruguayos: {totalNetoPesos.toFixed(2)}
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
            </TableRow>
          </TableHead>
          <TableBody>
            {facturas.filter(factura => factura.currency === 'USD').map((factura) => (
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
              </TableRow>
            ))}
          </TableBody>
        </Table>

        
        <Typography className='mt-3' variant="h6" gutterBottom>
          Total Neto en Dólares: {totalNetoDolares.toFixed(2)}
        </Typography>
        <Typography className='mt-3' variant="h6" gutterBottom>
          Total Neto en Dólares convertido a Pesos Uruguayos: {totalNetoDolaresEnPesos.toFixed(2)}
        </Typography>
        <Typography className='mt-3' variant="h6" gutterBottom>
          Suma Total Neto en Pesos Uruguayos: {totalNetoGlobalEnPesos.toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Informe;
