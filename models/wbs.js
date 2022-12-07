const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const wbsSchema = new Schema(
  {
    numberWbs: {
      type: String,
      unique: true,
      // required: true,
    },
    nameWbs: {
      type: String,
      // required: true,
    },
    approveNumber: {
      type: String,
      // required: true,
    },
    yearWbs: {
      type: String,
      // required: true,
    },
    wbsStatus: {
      type: String,
      // required: true,
    },
    dataUser: {
      BaCode: {
        type: String,
        // required: true,
      },
      BaName: {
        type: String,
        // required: true,
      },
      CostCenterName: {
        type: String,
        // required: true,
      },
      DepartmentFullName: {
        type: String,
        // required: true,
      },
      DepartmentShortName: {
        type: String,
        // required: true,
      },
      EmployeeId: {
        type: String,
        // required: true,
      },
      FullName: {
        type: String,
        // required: true,
      },
      Position: {
        type: String,
        // required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wbs", wbsSchema);
