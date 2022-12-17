const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
require("dotenv").config();

const wbsRoutes = require("./routes/wbs");
const hardwareRoutes = require("./routes/hardware");
const jobwbsRoutes = require("./routes/jobwbs");
const authRoutes = require("./routes/auth");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

// const fileFilter = (req, file, cb) => {
//   // if (
//   //   file.mimetype === "image/png" ||
//   //   file.mimetype === "image/jpg" ||
//   //   file.mimetype === "image/jpeg"
//   // ) {
//   //   cb(null, true);
//   // } else {
//   // cb(null, false);
//   // }
//   cb(null, true);
// };

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  multer({
    storage: fileStorage,
    // fileFilter: fileFilter,
  }).single("fileUrl")
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/auth", authRoutes);
app.use("/wbs", wbsRoutes);
app.use("/jobwbs", jobwbsRoutes);
app.use("/hardware", hardwareRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose
  .connect(process.env.MONGODB)
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => console.log());
