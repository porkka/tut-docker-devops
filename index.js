const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
} = require("./config/config");

const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
const port = process.env.PORT || 3000;
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log(">> Database connected"))
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.get("/", (req, res) => {
  res.send("<h2>Hello world</h2>");
});

app.use(express.json());
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.listen(port, () => console.log(`>> Listening on port ${port}`));
