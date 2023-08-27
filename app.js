require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const notFoundMiddleware = require("./middlewares/notFoundMiddleWare");
const verifyUser = require("./middlewares/authorization");
const errorHandler = require("./middlewares/errorHandler");

const port = 3000;

//middlewares
app.use(express.json());
app.use("/api/v1", authRouter);
app.use(express.urlencoded({ limit: "10mb", extended: "true" }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("TACSFON Web API");
});

app.use(notFoundMiddleware);
app.use(errorHandler);

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

start();
