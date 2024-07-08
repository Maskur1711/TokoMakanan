// pages/Dashboard.js

import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import Cards from "../components/Cards";
import EditModal from "../components/ModalEdit";
import axios from "axios";

const Dashboard = () => {
  const [MakananItems, setMakananItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedMakanan, setSelectedMakanan] = useState(null);

  useEffect(() => {
    const GetAllMakanan = async () => {
      try {
        const response = await axios.get("http://localhost:2290/api/makanan");
        const makananItemsFiltered = response.data.map(
          ({ id, ...rest }) => rest
        );
        setMakananItems(makananItemsFiltered);
      } catch (error) {
        console.error("Error fetching food items:", error);
      }
    };

    GetAllMakanan();
  }, []);

  const handleEditClick = (makanan) => {
    setSelectedMakanan(makanan);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMakanan(null);
  };

  const handleSave = (updatedMakanan) => {
    // Lakukan logika penyimpanan, misalnya panggil API untuk update data
    const updatedItems = MakananItems.map((item) =>
      item.nama === updatedMakanan.nama ? updatedMakanan : item
    );
    setMakananItems(updatedItems);
  };

  return (
    <>
      <Grid container spacing={3} sx={{ padding: "20px" }}>
        {MakananItems.map((makanan, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Cards
              title={makanan.nama}
              content={`Harga: ${makanan.harga}`}
              description={`Deskripsi: ${makanan.deskripsi}`}
              actionText="Edit"
              actionOnClick={() => handleEditClick(makanan)}
              image={`http://localhost:2290/${makanan.gambar}`}
            />
          </Grid>
        ))}
      </Grid>
      {selectedMakanan && (
        <EditModal
          open={openModal}
          handleClose={handleCloseModal}
          initialData={selectedMakanan}
          handleSave={handleSave}
        />
      )}
    </>
  );
};

export default Dashboard;
