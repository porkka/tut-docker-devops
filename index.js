const express = require("express");
const mongoose = require("mongoose");
const postRouter = require("./routes/postRoutes");
const userRouter = require("./routes/userRoutes");
const session = require("express-session");
const redis = require("redis");

let RedisStore = require("connect-redis").default;

const {
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

let redisClient = redis.createClient({
  host: REDIS_URL,
  port: REDIS_PORT,
});

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

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);

app.use(express.json());
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/users", userRouter);

app.listen(port, () => console.log(`>> Listening on port ${port}`));
