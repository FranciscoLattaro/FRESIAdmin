import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import FacturaForm from './FacturaForm'; // Importa el componente FacturaForm

const Facturas = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getPrefix = () => {
    switch (value) {
      case 0:
        return "PM";
      case 1:
        return "SH";
      case 2:
        return "GV";
      default:
        return "";
    }
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
            <FacturaForm prefix={getPrefix()} /> {/* Agrega el formulario aquí */}
          </>
        )}
        {value === 1 && (
          <>
            <FacturaForm prefix={getPrefix()} /> {/* Agrega el formulario aquí */}
          </>
        )}
        {value === 2 && (
          <>
            <FacturaForm prefix={getPrefix()} /> {/* Agrega el formulario aquí */}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Facturas;
