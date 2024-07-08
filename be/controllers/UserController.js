const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Konten tidak boleh kosong!",
    });
  }

  const newUser = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };

  User.create(newUser, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Terjadi kesalahan saat membuat user.",
      });
    } else res.send(data);
  });
};

exports.login = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Konten tidak boleh kosong!",
    });
  }

  const { email, password } = req.body;

  User.findByEmail(email, async (err, user) => {
    if (err || !user) {
      return res.status(404).send({
        message: "User tidak ditemukan!",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({
        message: "Password salah!",
      });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, "secret_key", {
      expiresIn: "1h",
    });

    res.send({
      message: "Login berhasil!",
      token: token,
    });
  });
};
