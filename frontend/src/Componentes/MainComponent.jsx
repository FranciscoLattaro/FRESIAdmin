import React, { useState } from "react";
import { Box, Tabs, Tab, Typography } from "@mui/material";
import MostrarBImp from "./MostrarBImp";
import MostrarEImp from "./MostrarEImp";
import MostrarTrackings from "./MostrarTrackings";
import MostrarFranquicias from "./MostrarFranquicias";
import "./estilos.css";

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const MainComponent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Importaciones (B)" />
          <Tab label="Importaciones (E)" />
          <Tab label="Trackings" />
          <Tab label="Suites PM" />
        </Tabs>
      </Box>
      <Box sx={{ p: 3 }}>
        <TabPanel value={value} index={0}>
          <MostrarBImp />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MostrarEImp />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MostrarTrackings />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <MostrarFranquicias />
        </TabPanel>
      </Box>
    </Box>
  );
};

export default MainComponent;
