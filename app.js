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
const blogRouter = require("./routes/blogPostRoutes");

//Error handling middlewares
const notFoundMiddleware = require("./middlewares/notFoundMiddleWare");
const errorHandler = require("./middlewares/errorHandler");

//verify authorization
const verifyUser = require("./middlewares/authorization");

//middlewares
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp" }));

//Routes that does not require authorization
app.use("/api/v1", authRouter);
app.use("/api/v1/user", userRouter);

//Routes that require authorization

app.use("/api/v1/exco", verifyUser, excoRouter);
app.use("/api/v1", verifyUser, eventsRouter);
app.use("/api/v1", verifyUser, testimonyRouter);
app.use("/api/v1", verifyUser, galleryRouter);
app.use("/api/v1/blog", verifyUser, blogRouter);
app.use(express.urlencoded({ limit: "10mb", extended: "true" }));

const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("TACSFON Web API");
});

app.use(notFoundMiddleware);
app.use(errorHandler);

// https://tacsfon-backend.vercel.app/api/v1/exco/

const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
};

start();
