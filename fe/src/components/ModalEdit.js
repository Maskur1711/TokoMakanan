import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditModal = ({ open, handleClose, initialData, handleSave }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    handleSave(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          Edit Makanan
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          label="Nama"
          name="nama"
          value={formData.nama}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Harga"
          name="harga"
          value={formData.harga}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          fullWidth
          label="Deskripsi"
          name="deskripsi"
          value={formData.deskripsi}
          onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal;
