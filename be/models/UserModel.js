const db = require("../config/db");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const User = {};

User.create = async (newUser, result) => {
  newUser.id = uuidv4();
  newUser.password = await bcrypt.hash(newUser.password, 10);

  db.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByEmail = (email, result) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, res) => {
    if (err) {
      result(err, null);
      return;
    }
    result(null, res[0]);
  });
};

module.exports = User;
