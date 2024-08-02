import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import axios from "axios";

const FacturaForm = () => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("UYU");
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("description", description);
    formData.append("amount", amount);
    formData.append("currency", currency);

    try {
      const response = await axios.post(
        "http://localhost:8000/factura/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("File uploaded successfully:", response.data);
      // Reset form
      setFile(null);
      setDescription("");
      setAmount("");
      setCurrency("UYU");
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      handleCloseConfirm();
    }
  };

  return (
    <Card>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleOpenConfirm();
          }}
        >
          <input
            accept="image/*"
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<UploadFile />}
            >
              Subir Imagen
            </Button>
          </label>
          {file && <Typography>Archivo seleccionado: {file.name}</Typography>}
          <TextField
            fullWidth
            margin="normal"
            label="Descripción"
            variant="outlined"
            value={description}
            onChange={handleDescriptionChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Monto"
            variant="outlined"
            type="number"
            value={amount}
            onChange={handleAmountChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Moneda</InputLabel>
            <Select
              value={currency}
              onChange={handleCurrencyChange}
              label="Moneda"
            >
              <MenuItem value="UYU">UYU</MenuItem>
              <MenuItem value="USD">USD</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </form>
      </CardContent>

      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmar Subida"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ¿Estás seguro de que deseas subir este archivo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSubmit} color="primary" autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default FacturaForm;
