const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const date = new Date();

// const day = date.getDate().toString().padStart(2, "0");
// const month = (date.getMonth() + 1).toString().padStart(2, "0");
// const year = date.getFullYear().toString();
// const localDateString = `${day}/${month}/${year}`;
const date = new Date();

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
    jobWbsdone: {
      idJob: {
        type: String,
      },
      jobStatus: {
        type: String,
      },
      jobDatadone: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wbs", wbsSchema);
