// controllers/MakananController.js
const Makanan = require("../models/MakananModel");

exports.getAllMakanan = (req, res) => {
  Makanan.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Terjadi kesalahan saat mengambil data makanan.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.getMakananById = (req, res) => {
  const id = req.params.id;

  Makanan.getById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Makanan dengan id ${id} tidak ditemukan.`,
        });
      } else {
        res.status(500).send({
          message: `Terjadi kesalahan saat mengambil data makanan dengan id ${id}.`,
        });
      }
    } else {
      res.send(data);
    }
  });
};

exports.createMakanan = (req, res) => {
  const { nama, harga, deskripsi } = req.body;
  const gambar = "uploads/" + req.file.filename; // Path lengkap gambar di server

  const newMakanan = {
    nama: nama,
    harga: harga,
    deskripsi: deskripsi,
    gambar: gambar,
  };

  Makanan.create(newMakanan, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan saat membuat makanan.",
      });
    } else {
      res.send(data);
    }
  });
};

exports.updateMakananById = (req, res) => {
  const id = req.params.id;
  const { nama, harga, deskripsi } = req.body;
  let gambar = req.file ? "uploads/" + req.file.filename : null; // Jika ada file gambar baru diunggah

  const updatedMakanan = {
    nama: nama,
    harga: harga,
    deskripsi: deskripsi,
    gambar: gambar,
  };

  Makanan.updateById(id, updatedMakanan, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message ||
          `Terjadi kesalahan saat memperbarui makanan dengan id=${id}.`,
      });
    } else {
      res.send(data);
    }
  });
};

exports.deleteMakananById = (req, res) => {
  const id = req.params.id;

  Makanan.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Makanan dengan id ${id} tidak ditemukan.`,
        });
      } else {
        res.status(500).send({
          message: `Terjadi kesalahan saat menghapus makanan dengan id ${id}.`,
        });
      }
    } else {
      res.send({ message: `Makanan berhasil dihapus.` });
    }
  });
};
