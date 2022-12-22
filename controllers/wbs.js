const { validationResult } = require("express-validator/check");
const Wbs = require("../models/wbs");
const Job = require("../models/jobwbs");

exports.createWbs = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed , enter is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const approveNumber = req.body.approveNumber;
  const nameWbs = req.body.nameWbs;
  const numberWbs = req.body.numberWbs;
  const yearWbs = req.body.yearWbs;
  const BaCode = req.body.BaCode;
  const BaName = req.body.BaName;
  const CostCenterName = req.body.CostCenterName;
  const DepartmentFullName = req.body.DepartmentFullName;
  const DepartmentShortName = req.body.DepartmentShortName;
  const EmployeeId = req.body.EmployeeId;
  const FullName = req.body.FullName;
  const Position = req.body.Position;

  //   let creator;
  const wbs = new Wbs({
    approveNumber: approveNumber,
    nameWbs: nameWbs,
    numberWbs: numberWbs,
    yearWbs: yearWbs,
    wbsStatus: "A0",
    dataUser: {
      BaCode: BaCode,
      BaName: BaName,
      CostCenterName: CostCenterName,
      DepartmentFullName: DepartmentFullName,
      DepartmentShortName: DepartmentShortName,
      EmployeeId: EmployeeId,
      FullName: FullName,
      Position: Position,
    },
  });
  wbs
    .save()
    .then((result) => {
      res.status(200).json({
        message: "user saved successfully",
        // wbs: result._id,
        wbs: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postWbscounts = (req, res, next) => {
  const yearWbs = req.body.yearWbs;
  const BaName = req.body.BaName;

  Wbs.aggregate([
    {
      $match: { yearWbs: yearWbs, "dataUser.BaName": BaName },
    },
    {
      $facet: {
        first: [
          {
            $match: {
              wbsStatus: "A0",
            },
          },
        ],
        second: [
          {
            $match: {
              wbsStatus: "C1",
            },
          },
        ],
        third: [
          {
            $match: {
              wbsStatus: "D1",
            },
          },
        ],
        four: [
          {
            $match: {
              wbsStatus: "D2",
            },
          },
        ],
        five: [
          {
            $match: {
              wbsStatus: "F4",
            },
          },
        ],
      },
    },
    {
      $project: {
        A0: {
          $size: "$first",
        },
        C1: {
          $size: "$second",
        },
        D1: {
          $size: "$third",
        },
        D2: {
          $size: "$four",
        },
        F4: {
          $size: "$five",
        },
        year: yearWbs,
      },
    },
  ])
    .then((result) => {
      res.status(200).json({
        message: "load data",
        // wbs: result._id,
        wbs: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postWbstables = (req, res, next) => {
  const yearWbs = req.body.yearWbs;
  const wbsStatus = req.body.wbsStatus;
  const BaName = req.body.BaName;

  if (wbsStatus === "ALL") {
    Wbs.find(
      {
        yearWbs: yearWbs,
        "dataUser.BaName": BaName,
      },
      {
        numberWbs: 1,
        nameWbs: 1,
        approveNumber: 1,
        wbsStatus: 1,
      }
    )
      .then((result) => {
        res.status(200).json({
          message: "load data",
          wbs: result,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  } else {
    Wbs.find(
      {
        yearWbs: yearWbs,
        wbsStatus: wbsStatus,
        "dataUser.BaName": BaName,
      },
      {
        numberWbs: 1,
        nameWbs: 1,
        approveNumber: 1,
        wbsStatus: 1,
      }
    )
      .then((result) => {
        res.status(200).json({
          message: "load data",
          wbs: result,
        });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  }
};

exports.postWbsone = (req, res, next) => {
  const idwbs = req.body.idwbs;

  Wbs.findOne(
    {
      _id: idwbs,
    },
    {
      numberWbs: 1,
      nameWbs: 1,
      approveNumber: 1,
      wbsStatus: 1,
    }
  )
    .then((result) => {
      res.status(200).json({
        message: "load data",
        wbs: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postWbsjobdone = async (req, res, next) => {
  const idwbs = req.body.idwbs;
  const idJob = req.body.idJob;
  const jobStatus = req.body.jobStatus;

  let text;

  try {
    const findjobwbsStatus = await Job.find({
      _id: idJob,
    });

    switch (findjobwbsStatus[0].jobwbsStatus) {
      case "A0":
        text = "C1";
        break;
      case "C1":
        text = "D1";
        break;
      case "D1":
        text = "D2";
        break;
      case "D2":
        text = "F4";
        break;
      default:
        text = "I have never heard of that fruit...";
    }

    if (findjobwbsStatus[0].jobwbsNextstep === "false") {
      try {
        const findDone = await Wbs.find({
          "jobWbsdone.idJob": idJob,
        });
        // console.log(findDone);

        if (!findDone.length) {
          try {
            const updatedUser = await Wbs.findByIdAndUpdate(
              { _id: idwbs },
              {
                $push: {
                  jobWbsdone: {
                    idJob: idJob,
                    jobStatus: jobStatus,
                  },
                },
              }
            );
            res.status(200).json({
              message: "load data",
              data: updatedUser,
            });
          } catch (error) {
            if (!error.statusCode) {
              error.statusCode = 500;
            }
            next(error);
          }
        } else {
          res.status(200).json({
            message: "ok",
          });
        }
      } catch (error) {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      }
    } else {
      try {
        const findDone = await Wbs.find({
          "jobWbsdone.idJob": idJob,
        });
        // console.log(findDone);

        if (!findDone.length) {
          try {
            const updatedUser = await Wbs.findByIdAndUpdate(
              { _id: idwbs },
              { $set: { wbsStatus: text } },
              {
                $push: {
                  jobWbsdone: {
                    idJob: idJob,
                    jobStatus: jobStatus,
                  },
                },
              }
            );
            const updatedUser2 = await Wbs.findByIdAndUpdate(
              { _id: idwbs },
              {
                $push: {
                  jobWbsdone: {
                    idJob: idJob,
                    jobStatus: jobStatus,
                  },
                },
              }
            );
            res.status(200).json({
              message: "load data",
              data: updatedUser,
              data2: updatedUser2,
            });
          } catch (error) {
            if (!error.statusCode) {
              error.statusCode = 500;
            }
            next(error);
          }
        } else {
          res.status(200).json({
            message: "ok",
          });
        }
      } catch (error) {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      }
    }
  } catch {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.postWbsjobupdate = async (req, res, next) => {
  const idwbs = req.body.idwbs;

  try {
    const response = await Wbs.findOne({
      _id: idwbs,
    });
    res.status(200).json({
      message: "load data",
      wbsjobupdate: response,
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
