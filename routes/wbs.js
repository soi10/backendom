const express = require("express");
const { body } = require("express-validator/check");

const wbsController = require("../controllers/wbs");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post(
  "/post",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  wbsController.createWbs
);

router.post(
  "/getwbscounts",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  wbsController.postWbscounts
);

router.post(
  "/getwbstables",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  wbsController.postWbstables
);

router.post(
  "/getwbsone",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  wbsController.postWbsone
);

module.exports = router;
