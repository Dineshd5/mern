const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/authRoutes");

const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// app.get("/login", (req, res) => {
//   res.send("Hi");
// });

app.use("/auth", routes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(
    app.listen(3000, () => {
      console.log("server is running in port 3000");
      console.log("🔐 MONGO_URI:", process.env.MONGO_URI);
    })
  )

  .catch((err) => {
    console.log(err);
  });
