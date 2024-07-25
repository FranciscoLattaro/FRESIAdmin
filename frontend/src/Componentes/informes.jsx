import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const Informe = () => {
  const [facturas, setFacturas] = useState([]);
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const calculateTotal = () => {
    const totalFacturas = facturas.reduce((sum, factura) => sum + parseFloat(factura.amount), 0);
    const totalGastos = gastos.reduce((sum, gasto) => sum + parseFloat(gasto.amount), 0);
    return totalFacturas - totalGastos;
  };

  const handleOpenImage = (filePath) => {
    const imageUrl = `http://localhost:8000/${filePath}`;
    window.open(imageUrl, '_blank');
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Informe de Facturas y Gastos
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Facturas
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Descripción</TableCell>
              <TableCell>Monto</TableCell>
              <TableCell>Moneda</TableCell>
              <TableCell>Imagen</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {facturas.map((factura) => (
              <TableRow key={factura.id}>
                <TableCell>{factura.description}</TableCell>
                <TableCell>{factura.amount}</TableCell>
                <TableCell>{factura.currency}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenImage(factura.filePath)}
                  >
                    Ver Imagen
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Typography className='mt-3' variant="h6" gutterBottom>
          Total Neto: {calculateTotal().toFixed(2)}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Informe;
