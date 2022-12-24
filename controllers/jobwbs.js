const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator/check");
const Jobwbs = require("../models/jobwbs");

exports.createJobwbs = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed , enter is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const jobwbsName = req.body.jobwbsName;
  const jobwbsStatus = req.body.jobwbsStatus;
  const jobwbsExplain = req.body.jobwbsExplain;
  const jobwbsWarning = req.body.jobwbsWarning;
  const jobwbsNextstep = req.body.jobwbsNextstep;
  const jobwbsOrder = req.body.jobwbsOrder;
  const jobwbsLocation = req.body.jobwbsLocation;

  const jobwbs = new Jobwbs({
    jobwbsName: jobwbsName,
    jobwbsStatus: jobwbsStatus,
    jobwbsExplain: jobwbsExplain,
    jobwbsWarning: jobwbsWarning,
    jobwbsNextstep: jobwbsNextstep,
    jobwbsOrder: jobwbsOrder,
    jobwbsLocation: jobwbsLocation,
  });

  try {
    const result = await jobwbs.save();
    res.status(200).json({
      message: "user saved successfully",
      jobwbs: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postJobwbs = async (req, res, next) => {
  const job = req.body.job;
  const BaName = req.body.BaName;

  try {
    const result = await Jobwbs.find({
      jobwbsStatus: job,
      jobwbsLocation: BaName,
    }).sort({ jobwbsOrder: 1 });
    res.status(200).json({
      message: "load data",
      jobwbs: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.postJobwbsname = async (req, res, next) => {
  const idjob2 = req.body.idjob2;

  try {
    const result = await Jobwbs.findOne(
      {
        _id: idjob2,
      },
      { fileJob: 0 }
    );
    res.status(200).json({
      message: "load data",
      jobwbs: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteJobwbs = async (req, res, next) => {
  const jobwbsId = req.body.jobwbsId;

  try {
    const post = await Jobwbs.findById(jobwbsId);
    if (!post) {
      const error = new Error("Could not find post");
      error.statusCode = 404;
      throw error;
    }

    await Jobwbs.findByIdAndRemove(jobwbsId);
    res.status(200).json({
      messages: "Delete post successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.uploadJobfile = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed , enter is incorrect");
    error.statusCode = 422;
    throw error;
  }

  if (!req.file) {
    const error = new Error("No image file");
    error.statusCode = 422;
    throw error;
  }

  const fileUrl = req.file.path;
  const fileName = req.body.fileName;
  const fileDetail = req.body.fileDetail;
  const fileOrder = req.body.fileOrder;
  const idJobwbs = req.body.idJobwbs;

  try {
    const success = await Jobwbs.findByIdAndUpdate(
      { _id: idJobwbs },
      {
        $push: {
          fileJob: {
            fileName: fileName,
            fileDetail: fileDetail,
            fileUrl: fileUrl,
            fileOrder: fileOrder,
          },
        },
      }
    );
    res.status(200).json({
      messages: success,
    });
  } catch (error) {
    next(error);
  }
};

exports.postJobFileone = async (req, res, next) => {
  try {
    const idjob2 = req.body.idjob2;

    const result = await Jobwbs.findOne(
      {
        _id: idjob2,
      },
      {
        fileJob: 1,
      }
    );

    res.status(200).json({
      message: "load data",
      fileJob: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteJobfile = async (req, res, next) => {
  try {
    const fileUrl = req.body.fileUrl;

    const jobwbs = await Jobwbs.findOneAndUpdate(
      {
        "fileJob.fileUrl": fileUrl,
      },
      { $pull: { fileJob: { fileUrl: fileUrl } } }
    );

    if (!jobwbs) {
      const error = new Error("Could not find post");
      error.statusCode = 404;
      throw error;
    }

    clearImage(fileUrl);

    res.status(200).json({
      messages: "Delete post successfully",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const clearImage = (filePath) => {
  filePath = path.join(__dirname, "..", filePath);
  fs.unlink(filePath, (err) => console.log(err));
};
