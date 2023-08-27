require("express-async-errors");
require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const notFoundMiddleware = require("./middlewares/notFoundMiddleWare");
const verifyUser = require("./middlewares/authorization");
const errorHandler = require("./middlewares/errorHandler");

const port = 3000;
app.get("/", (req, res) => res.send("Hello World!"));

//middlewares
app.use(express.json());
app.use("/api/v1", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("TACSFON Web API");
});
const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

start();
