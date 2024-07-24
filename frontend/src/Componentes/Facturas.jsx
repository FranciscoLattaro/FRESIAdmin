import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import FacturaForm from './FacturaForm'; // Importa el componente FacturaForm

const Facturas = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="tabs example">
          <Tab label="Punto Mio" />
          <Tab label="Importaciones Shein" />
          <Tab label="Gastos Varios" />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        {value === 0 && (
          <>
            <Typography className='mb-2'>Sube tu factura de Punto Mío! Recuerda agregar PM en la descripción</Typography>
            <FacturaForm /> {/* Agrega el formulario aquí */}
          </>
        )}
        {value === 1 && (
          <>
            <Typography className='mb-2'>Sube tu factura de SHEIN! Recuerda agregar SH en la descripción</Typography>
            <FacturaForm /> {/* Agrega el formulario aquí */}
          </>
        )}
        {value === 2 && (
          <>
            <Typography className='mb-2'>Sube tu factura de Gastos Varios! Recuerda agregar GV en la descripción</Typography>
            <FacturaForm /> {/* Agrega el formulario aquí */}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Facturas;
