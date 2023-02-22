const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator/check");
const Node = require("../models/node");
const mongoose = require("mongoose");

exports.createNode = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed , enter is incorrect");
    error.statusCode = 422;
    throw error;
  }

  var today = new Date();
  var day = today.getDate() + "";
  var month = today.getMonth() + 1 + "";
  var year = today.getFullYear() + "";
  var hour = today.getHours() + "";
  var minutes = today.getMinutes() + "";
  var seconds = today.getSeconds() + "";

  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);
  hour = checkZero(hour);
  minutes = checkZero(minutes);
  seconds = checkZero(seconds);

  function checkZero(data) {
    if (data.length == 1) {
      data = "0" + data;
    }
    return data;
  }

  const nameNode = req.body.nameNode;
  const peaNode = req.body.peaNode;
  const explainNode = req.body.explainNode;
  const userNode = req.body.userNode;
  const codeNode = req.body.codeNode;
  const departmentFullNameNode = req.body.departmentFullNameNode;

  const dateNode =
    day + "/" + month + "/" + year + " " + hour + ":" + minutes + ":" + seconds;

  const node = new Node({
    nameNode: nameNode,
    explainNode: explainNode,
    peaNode: peaNode,
    userNode: userNode,
    codeNode: codeNode,
    departmentFullNameNode: departmentFullNameNode,
    dateNode: dateNode,
  });

  try {
    const result = await node.save();
    res.status(201).json({
      message: "บันทึกสำเร็จ",
      node: result,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

exports.fetchNode = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed , enter is incorrect");
    error.statusCode = 422;
    throw error;
  }
  const peaNode = req.body.peaNode;
  const departmentFullNameNode = req.body.departmentFullNameNode;

  try {
    const fetchNode = await Node.find({
      peaNode: peaNode,
      departmentFullNameNode: departmentFullNameNode,
    });
    res.status(200).json({
      message: "success",
      node: fetchNode,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

exports.fetchOneNode = async (req, res, next) => {
  const nodeId = req.body.nodeId;

  try {
    const fetchOneNode = await Node.findOne({
      _id: nodeId,
    });
    res.status(200).json({
      message: "success",
      node: fetchOneNode,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

exports.updateOneNode = async (req, res, next) => {
  const nodeId = req.body.nodeId;
  const nameNode = req.body.nameNode;
  const explainNode = req.body.explainNode;

  try {
    const query = { _id: nodeId };
    const updateOneNode = await Node.findOneAndUpdate(
      query,
      {
        nameNode: nameNode,
        explainNode: explainNode,
      },
      { new: true }
    );
    res.status(200).json({
      message: "success",
      node: updateOneNode,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

exports.deleteNode = async (req, res, next) => {
  const nodeId = req.body.nodeId;
  try {
    const deleteNode = await Node.deleteOne({ _id: nodeId });
    res.status(200).json({
      message: "Delete post successfully",
      node: deleteNode,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createStatus = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed , enter is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const orderStatus = req.body.orderStatus;
  const nameStatus = req.body.nameStatus;
  const explainStatus = req.body.explainStatus;
  const nodeId = req.body.nodeId;

  try {
    const result = await Node.findByIdAndUpdate(
      { _id: nodeId },
      {
        $push: {
          nodeStatus: {
            orderStatus: orderStatus,
            nameStatus: nameStatus,
            explainStatus: explainStatus,
          },
        },
      }
    );
    res.status(201).json({
      message: "บันทึกสำเร็จ",
      node: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchOneStatus = async (req, res, next) => {
  const idNode = req.body.idNode;
  const idStatus = req.body.idStatus;

  try {
    const fetchOneStatus = await Node.find(
      {
        _id: idNode,
        "nodeStatus._id": idStatus,
      },
      {
        nameNode: 1,
        explainNode: 1,
        "nodeStatus.$": 1,
      }
    );
    res.status(200).json({
      message: "success",
      node: fetchOneStatus,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateOneStatus = async (req, res, next) => {
  const nodeId = req.body.nodeId;
  const orderStatus = req.body.orderStatus;
  const nameStatus = req.body.nameStatus;
  const explainStatus = req.body.explainStatus;
  const idStatus = req.body.idStatus;

  try {
    const updateOneStatus = await Node.findOneAndUpdate(
      {
        _id: nodeId,
        nodeStatus: {
          $elemMatch: {
            _id: idStatus,
          },
        },
      },
      {
        $set: {
          "nodeStatus.$.orderStatus": orderStatus,
          "nodeStatus.$.nameStatus": nameStatus,
          "nodeStatus.$.explainStatus": explainStatus,
        },
      },
      { new: true }
    );
    res.status(200).json({
      message: "success",
      node: updateOneStatus,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteStatus = async (req, res, next) => {
  const idStatus = req.body.idStatus;

  try {
    const deleteStatus = await Node.findOneAndUpdate(
      {
        "nodeStatus._id": idStatus,
      },
      { $pull: { nodeStatus: { _id: idStatus } } }
    );
    res.status(200).json({
      message: "success",
      node: deleteStatus,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchbyIDStatus = async (req, res, next) => {
  const idStatus = req.body.idStatus;

  try {
    const fetchOneStatus = await Node.find(
      {
        "nodeStatus._id": idStatus,
      },
      {
        "nodeStatus.$": 1,
      }
    );
    res.status(200).json({
      message: "success",
      node: fetchOneStatus,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createInput = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed , enter is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const idNode = req.body.idNode;
  const idStatus = req.body.idStatus;

  const newItems = [
    {
      orderInput: "1",
      modelInput: "modelInput1",
      modelexInput: "modelexInput1",
    },
    {
      orderInput: "2",
      modelInput: "modelInput2",
      modelexInput: "modelexInput2",
    },
    {
      orderInput: "3",
      modelInput: "modelInput3",
      modelexInput: "modelexInput3",
    },
    {
      orderInput: "4",
      modelInput: "modelInput4",
      modelexInput: "modelexInput4",
    },
    {
      orderInput: "5",
      modelInput: "modelInput5",
      modelexInput: "modelexInput5",
    },
  ];

  try {
    const result = await Node.findOneAndUpdate(
      { _id: idNode },
      {
        $push: {
          "nodeStatus.$[elem].statusInput": {
            $each: newItems,
          },
        },
      },
      { arrayFilters: [{ "elem._id": idStatus }], new: true }
    );
    if (result) {
      const result2 = await Node.findOneAndUpdate(
        {
          _id: idNode,
          nodeStatus: {
            $elemMatch: {
              _id: idStatus,
            },
          },
        },
        {
          $set: {
            "nodeStatus.$.buttonInput": "false",
          },
        },
        { new: true }
      );
      res.status(201).json({
        message: "success",
        node: result2,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteStep = async (req, res, next) => {
  const idStep = req.body.idStep;

  try {
    const deleteStep = await Node.findOneAndUpdate(
      {
        "nodeStatus.statusStep._id": idStep,
      },
      {
        $pull: {
          "nodeStatus.$.statusStep": {
            _id: idStep,
          },
        },
      }
    );
    res.status(200).json({
      message: "success",
      node: deleteStep,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateOneInput = async (req, res, next) => {
  const idStatus = req.body.idStatus;
  const idInput = req.body.idInput;
  const nameInput = req.body.modelInput;
  const explainInput = req.body.modelexInput;

  try {
    const result = await Node.findOneAndUpdate(
      {}, // query to match the specific document
      {
        $set: {
          "nodeStatus.$[nodeStatus].statusInput.$[statusInput].nameInput":
            nameInput,
          "nodeStatus.$[nodeStatus].statusInput.$[statusInput].explainInput":
            explainInput,
        },
      }, // update to set the new title
      {
        arrayFilters: [
          { "nodeStatus._id": idStatus },
          { "statusInput._id": idInput },
        ],
        new: true,
      }
    );
    res.status(200).json({
      message: "success",
      node: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createStep = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed , enter is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const idNode = req.body.idNode;
  const idStatus = req.body.idStatus;
  const stepOrder = req.body.stepOrder;
  const stepName = req.body.stepName;
  const stepExplain = req.body.stepExplain;
  const stepWarning = req.body.stepWarning;
  const stepNext = req.body.stepNext;

  try {
    const result = await Node.findOneAndUpdate(
      { _id: idNode },
      {
        $push: {
          "nodeStatus.$[elem].statusStep": {
            stepOrder: stepOrder,
            stepName: stepName,
            stepExplain: stepExplain,
            stepWarning: stepWarning,
            stepNext: stepNext,
            stepMake: "false",
          },
        },
      },
      { arrayFilters: [{ "elem._id": idStatus }], new: true }
    );

    res.status(201).json({
      message: "success",
      node: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createDetail = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed , enter is incorrect");
    error.statusCode = 422;
    throw error;
  }

  const idNode = req.body.idNode;
  const modelInput1 = req.body.modelInput1;
  const modelInput2 = req.body.modelInput2;
  const modelInput3 = req.body.modelInput3;
  const modelInput4 = req.body.modelInput4;
  const modelInput5 = req.body.modelInput5;
  const modelInputStatusName = req.body.modelInputStatusName;
  const modelInputStatusId = req.body.modelInputStatusId;

  try {
    const result = await Node.findByIdAndUpdate(
      { _id: idNode },
      {
        $push: {
          nodeDetail: {
            modelInput1: modelInput1,
            modelInput2: modelInput2,
            modelInput3: modelInput3,
            modelInput4: modelInput4,
            modelInput5: modelInput5,
            modelInputStatusName: modelInputStatusName,
            modelInputStatusId: modelInputStatusId,
          },
        },
      }
    );
    res.status(201).json({
      message: "success",
      node: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteDetail = async (req, res, next) => {
  const idDetail = req.body.idDetail;

  try {
    const deleteStatus = await Node.findOneAndUpdate(
      {
        "nodeDetail._id": idDetail,
      },
      { $pull: { nodeDetail: { _id: idDetail } } }
    );
    res.status(200).json({
      message: "success",
      node: deleteStatus,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchOneDetail = async (req, res, next) => {
  const idDetail = req.body.idDetail;

  try {
    const fetchOneNode = await Node.findOne(
      {
        "nodeDetail._id": idDetail,
      },
      {
        "nodeDetail.$": 1,
      }
    );
    res.status(200).json({
      message: "success",
      node: fetchOneNode,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

exports.fetchStatusStep = async (req, res, next) => {
  const idStatus = req.body.idStatus;
  const statusStep = req.body.statusStep;
  const statusName = req.body.statusName;

  try {
    const fetchOneNode = await Node.findOne(
      {
        // "nodeStatus._id": statusStep,
        "nodeStatus._id": statusStep,
        "nodeStatus.nameStatus": statusName,
      },
      {
        "nodeStatus.statusStep.$": 1,
      }
    );
    res.status(200).json({
      message: "success",
      node: fetchOneNode,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

exports.fetchStepOne = async (req, res, next) => {
  const idstep = req.body.idstep;

  try {
    const fetchStepOne = await Node.findOne(
      {
        "nodeStatus.statusStep._id": idstep,
      },
      { "nodeStatus.statusStep.$": 1 }
    );

    res.status(200).json({
      message: "success",
      node: fetchStepOne,
    });
  } catch (err) {
    res.json({
      message: err,
    });
  }
};

exports.uploadStepfile = async (req, res, next) => {
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
  // const idStep = req.body.idStep;
  const idStatus = mongoose.Types.ObjectId(req.body.idStatus);
  const idStep = mongoose.Types.ObjectId(req.body.idStep);

  try {
    const uploadStepfile = await Node.findOneAndUpdate(
      {}, // query to match the specific document
      {
        $push: {
          "nodeStatus.$[node].statusStep.$[step].stepFile": {
            fileOrder: fileOrder,
            fileName: fileName,
            fileDetail: fileDetail,
            fileUrl: fileUrl,
          },
        },
      },
      {
        arrayFilters: [{ "node._id": idStatus }, { "step._id": idStep }],
        new: true,
      }
    );
    res.status(200).json({
      message: "success",
      node: uploadStepfile,
    });
  } catch (error) {
    next(error);
  }
};

exports.fetchFileStep = async (req, res, next) => {
  const idStep = req.body.idStep;

  try {
    const fetchOneNode = await Node.findOne(
      {
        "nodeStatus.statusStep._id": idStep,
      },
      { "nodeStatus.statusStep.$": 1 }
    );
    res.status(200).json({
      message: "success",
      node: fetchOneNode,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteStepfile = async (req, res, next) => {
  const idFile = req.body.idFile;
  const fileUrl = req.body.fileUrl;
  const idStep = req.body.idStep;
  const idStatus = req.body.idStatus;

  try {
    const deleteStepfile = await Node.findOneAndUpdate(
      {}, // query to match the specific document
      {
        $pull: {
          "nodeStatus.$[status].statusStep.$[step].stepFile": {
            _id: idFile,
          },
        },
      },
      {
        arrayFilters: [{ "status._id": idStatus }, { "step._id": idStep }],
        new: true,
      }
    );
    if (!deleteStepfile) {
      const error = new Error("Could not find post");
      error.statusCode = 404;
      throw error;
    }

    clearImage(fileUrl);

    res.status(200).json({
      messages: "Delete",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.pushDetailDone = async (req, res, next) => {
  const idDetail = req.body.idDetail;
  const idStep = req.body.idStep;
  const idStatus = req.body.idStatus;

  try {
    const result = await Node.findOneAndUpdate(
      {}, // query to match the specific document
      {
        $push: {
          "nodeStatus.$[node].statusStep.$[step].detailDone": {
            idDetail: idDetail,
          },
        },
      },
      {
        arrayFilters: [{ "node._id": idStatus }, { "step._id": idStep }],
        new: true,
      }
    );
    res.status(200).json({
      message: "success",
      node: result,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.fetchNameStatus = async (req, res, next) => {
  const idNode = req.body.idNode;

  try {
    const fetchNameStatus = await Node.findOne(
      {
        _id: idNode,
      },
      { "nodeStatus.nameStatus": 1 }
    );

    res.status(200).json({
      message: "success",
      node: fetchNameStatus,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.pushDetailDoneAndUpdate = async (req, res, next) => {
  const idDetail = req.body.idDetail;
  const idStep = req.body.idStep;
  const idStatus = req.body.idStatus;
  const nameStatus = req.body.nameStatus;

  try {
    const result = await Node.findOneAndUpdate(
      {}, // query to match the specific document
      {
        $push: {
          "nodeDetail.$[nodeDetail].stepDone": {
            idStepDone: idStep,
          },
        },
      }, // update to set the new title
      {
        arrayFilters: [{ "nodeDetail._id": idDetail }],
        new: true,
      }
    );
    const updateOneNode = await Node.findOneAndUpdate(
      {
        nodeDetail: {
          $elemMatch: {
            _id: idDetail,
          },
        },
      },
      {
        $set: {
          "nodeDetail.$.modelInputStatusName": nameStatus,
          "nodeDetail.$.modelInputStatusId": idStatus,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "success",
      // node: result,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

exports.updateStatusDetail = async (req, res, next) => {
  const idStatus = req.body.idStatus;
  const nameStatus = req.body.nameStatus;
  const idDetail = req.body.idDetail;

  try {
    const result = await Node.findOneAndUpdate(
      {}, // query to match the specific document
      {
        $set: {
          "nodeDetail.$[idDetail].modelInputStatusName": nameStatus,
          "nodeDetail.$[idDetail].modelInputStatusId": idStatus,
        },
      }, // update to set the new title
      {
        arrayFilters: [{ "idDetail._id": idDetail }],
        new: true,
      }
    );
    res.status(200).json({
      message: "success",
      node: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.fetchDetailCount = async (req, res, next) => {
  const idStatus = req.body.idStatus;

  try {
    const fetchOneStatus = await Node.aggregate([
      {
        $match: {
          "nodeDetail.modelInputStatusId": idStatus,
        },
      },
      {
        $project: {
          count: {
            $size: {
              $filter: {
                input: "$nodeDetail",
                cond: {
                  $eq: ["$$this.modelInputStatusId", idStatus],
                },
              },
            },
          },
        },
      },
      {
        $group: {
          _id: null,
          count: {
            $sum: "$count",
          },
        },
      },
    ]);
    res.status(200).json({
      message: "success",
      node: fetchOneStatus,
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
