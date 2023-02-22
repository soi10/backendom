const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
require("dotenv").config();

const authRoutes = require("./routes/auth");
const nodeRoutes = require("./routes/node");

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    let random = Math.floor(Math.random() * 1000000000);
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") +
        random +
        path.extname(file.originalname)
    );
  },
});

app.use(bodyParser.json()); // application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  multer({
    storage: fileStorage,
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
app.use("/node", nodeRoutes);

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
    app.listen(process.env.PORT);
    console.log("server started port: " + process.env.PORT);
  })
  .catch((err) => console.log(err));
