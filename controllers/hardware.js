const { validationResult } = require("express-validator/check");
const Hardware = require("../models/hardware");

exports.getHardware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed , enter is incorrect");
    error.statusCode = 422;
    throw error;
  }

  Hardware.aggregate([
    {
      $project: {
        itemDescription: { $concat: ["$codeNumber", " | ", "$nameHardware"] },
        _id: 0,
        codeNumber: 1,
        nameHardware: 1,
        unit: 1,
      },
    },
  ])
    .then((result) => {
      res.status(200).json({
        message: "load data",
        hardware: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
