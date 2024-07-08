const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");

const Makanan = {};

Makanan.getAll = (result) => {
  db.query("SELECT * FROM makanan", (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

Makanan.getById = (id, result) => {
  db.query("SELECT * FROM makanan WHERE id = ?", [id], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res[0]);
  });
};

Makanan.create = (newMakanan, result) => {
  newMakanan.id = uuidv4();
  db.query("INSERT INTO makanan SET ?", newMakanan, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: newMakanan.id, ...newMakanan });
  });
};

Makanan.updateById = (id, makanan, result) => {
  db.query(
    "UPDATE makanan SET nama = ?, harga = ?, deskripsi = ?, gambar = ? WHERE id = ?",
    [makanan.nama, makanan.harga, makanan.deskripsi, makanan.gambar, id],
    (err, res) => {
      if (err) {
        result(err, null);
        return;
      }
      result(null, { id: id, ...makanan });
    }
  );
};

Makanan.remove = (id, result) => {
  db.query("DELETE FROM makanan WHERE id = ?", [id], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = Makanan;
