const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "toko_makanan",
});

db.connect((err) => {
  if (err) {
    console.error("Gagal Menghubungkan ke Database:", err);
    return;
  }
  console.log("Terhubung ke database MySQL!");
});

module.exports = db;