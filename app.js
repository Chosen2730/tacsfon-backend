require("express-async-errors");
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//Routers
const authRouter = require("./routes/auth");
const excoRouter = require("./routes/excoRoute");
const eventsRouter = require("./routes/eventsRoutes");
const testimonyRouter = require("./routes/testimony");
const galleryRouter = require("./routes/images");
const userRouter = require("./routes/user");

//Error handling middlewares
const notFoundMiddleware = require("./middlewares/notFoundMiddleWare");
const errorHandler = require("./middlewares/errorHandler");

//verify authorization
const verifyUser = require("./middlewares/authorization");
const port = 3000;

//middlewares
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

//Routes that does not require authorization
app.use("/api/v1", authRouter);
app.use("/api/v1/user", userRouter);

//Routes that require authorization
app.use("/api/v1/exco", verifyUser, excoRouter);
app.use("/api/v1", eventsRouter);
app.use("/api/v1", testimonyRouter);
app.use("/api/v1", galleryRouter);
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
