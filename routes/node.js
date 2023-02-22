const express = require("express");
const { body } = require("express-validator/check");

const nodeController = require("../controllers/node");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post(
  "/postnode",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.createNode
);

router.post(
  "/fetchnode",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.fetchNode
);

router.post(
  "/fetchonenode",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.fetchOneNode
);

router.post(
  "/deletenode",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.deleteNode
);

router.post(
  "/updateonenode",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.updateOneNode
);

router.post(
  "/createstatus",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.createStatus
);

router.post(
  "/fetchonestatus",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.fetchOneStatus
);

router.post(
  "/updateonestatus",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.updateOneStatus
);

router.post(
  "/deleteStatus",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.deleteStatus
);

router.post(
  "/fetchbyidstatus",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.fetchbyIDStatus
);

router.post(
  "/createinput",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.createInput
);

router.post(
  "/updateoneinput",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.updateOneInput
);

router.post(
  "/createstep",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.createStep
);

router.post(
  "/deletestep",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.deleteStep
);

router.post(
  "/createdetail",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.createDetail
);

router.post(
  "/deletedetail",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.deleteDetail
);

router.post(
  "/fetchonedetail",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.fetchOneDetail
);

router.post(
  "/fetchstatusstep",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.fetchStatusStep
);

router.post(
  "/fetchstepone",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.fetchStepOne
);

router.post(
  "/uploadstepfile",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.uploadStepfile
);

router.post(
  "/fetchfilestep",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.fetchFileStep
);

router.post(
  "/deletestepfile",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.deleteStepfile
);

router.post(
  "/pushdetaildone",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.pushDetailDone
);

router.post(
  "/fetchnamestatus",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.fetchNameStatus
);

router.post(
  "/pushdetaildoneandupdate",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.pushDetailDoneAndUpdate
);

router.post(
  "/updatestatusdetail",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.updateStatusDetail
);

router.post(
  "/fetchdetailcount",
  isAuth,
  // [
  //   body("nameWbs").trim().isLength({ min: 5 }),
  //   body("numberWbs").trim().isLength({ min: 5 }),
  // ],
  nodeController.fetchDetailCount
);

module.exports = router;
