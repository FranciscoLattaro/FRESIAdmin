import React, { useState } from "react";
import { AppBar, Tabs, Tab, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";
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

const StyledAppBar = styled(AppBar)({
  backgroundColor: "rgba(0, 0, 0, 0.2)",
});

const StyledTab = styled(Tab)({
  color: "black",
  textTransform: "none",
  fontSize: "1em",
});

const MainComponent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <StyledAppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <StyledTab label="Importaciones (B)" id="tab-0" />
          <StyledTab label="Importaciones (E)" id="tab-1" />
          <StyledTab label="Trackings" id="tab-2" />
          <StyledTab label="Suites PM" id="tab-3" />
        </Tabs>
      </StyledAppBar>
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
    </div>
  );
};

export default MainComponent;
