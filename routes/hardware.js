const express = require("express");
const { body } = require("express-validator/check");

const hardwareController = require("../controllers/hardware");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get(
  "/get",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  hardwareController.getHardware
);

module.exports = router;
