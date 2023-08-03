const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
} = require("./config/config");

const app = express();
const port = process.env.PORT || 3000;
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose
  .connect(mongoURL)
  .then(() => console.log(">> Database connected"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("<h2>Hello world</h2>");
});

app.listen(port, () => console.log(`>> Listening on port ${port}`));
