const e = require("express");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

mongoose
  .connect(
    `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
  )
  .then(() => console.log(">> Database connected"))
  .catch((e) => console.log(e));

app.get("/", (req, res) => {
  res.send("<h2>Hello world</h2>");
});

app.listen(port, () => console.log(`>> Listening on port ${port}`));
