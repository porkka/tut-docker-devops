const e = require("express");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect("mongodb://pelaaja2:munpassu@mongo:27017/?authSource=admin")
  .then(() => console.log(">> Database connected"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("<h2>Hello world</h2>");
});

app.listen(port, () => console.log(`>> Listening on port ${port}`));
