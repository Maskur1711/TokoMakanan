const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const MakananRoutes = require("./routers/MakananRouter");
const UserRouters = require("./routers/UserRouter");

app.use("/api/makanan", MakananRoutes);
app.use("/api/users", UserRouters);
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 2290;
app.listen(PORT, () => {
  console.log(`Server berjalan pada port ${PORT}`);
});
