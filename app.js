require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");

//Routers
const authRouter = require("./routes/auth");
const excoRouter = require("./routes/excoRoute");

//Error handling middlewares
const notFoundMiddleware = require("./middlewares/notFoundMiddleWare");
const errorHandler = require("./middlewares/errorHandler");

//verify authorization
const verifyUser = require("./middlewares/authorization");
const port = 3000;

//middlewares
app.use(express.json());
app.use(cors());
app.use("/api/v1", authRouter);
app.use("/api/v1", verifyUser, excoRouter);
app.use(express.urlencoded({ limit: "10mb", extended: "true" }));

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
