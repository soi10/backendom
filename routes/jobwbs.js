const express = require("express");
const { body } = require("express-validator/check");

const jobwbsController = require("../controllers/jobwbs");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post(
  "/post",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  jobwbsController.createJobwbs
);

router.post(
  "/postjobwbs",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  jobwbsController.postJobwbs
);

router.post(
  "/deletejobwbs",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  jobwbsController.deleteJobwbs
);

router.post(
  "/uploadjobfile",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  jobwbsController.uploadJobfile
);

router.post(
  "/postjobfileone",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  jobwbsController.postJobFileone
);

router.post(
  "/postjobwbsname",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  jobwbsController.postJobwbsname
);

router.post(
  "/deletejobfile",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  jobwbsController.deleteJobfile
);

module.exports = router;
