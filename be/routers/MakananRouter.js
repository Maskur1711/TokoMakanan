// routes/makanan.js
const express = require("express");
const router = express.Router();
const makananController = require("../controllers/MakananController");
const multer = require("multer");
const path = require("path");

// Konfigurasi multer untuk menyimpan gambar
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder penyimpanan gambar di server
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nama file yang unik dengan ekstensi
  },
});

const upload = multer({ storage: storage });

// Router untuk endpoint makanan
router.get("/", makananController.getAllMakanan);
router.get("/:id", makananController.getMakananById);

// Endpoint untuk create makanan dengan upload gambar
router.post("/", upload.single("gambar"), makananController.createMakanan);

// Endpoint untuk update makanan dengan upload gambar
router.put(
  "/:id",
  upload.single("gambar"),
  makananController.updateMakananById
);

router.delete("/:id", makananController.deleteMakananById);

module.exports = router;
