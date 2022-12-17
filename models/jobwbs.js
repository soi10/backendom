const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobwbsSchema = new Schema(
  {
    jobwbsName: {
      type: String,
      unique: true,
      // required: true,
    },
    jobwbsStatus: {
      type: String,
      // required: true,
    },
    jobwbsExplain: {
      type: String,
      // required: true,
    },
    jobwbsWarning: {
      type: String,
      // required: true,
    },
    jobwbsNextstep: {
      type: String,
      required: true,
    },
    jobwbsLocation: {
      type: String,
      required: true,
    },
    jobwbsOrder: {
      type: Number,
      required: true,
    },
    fileJob: {
      fileName: {
        type: String,
      },
      fileDetail: {
        type: String,
      },
      fileUrl: {
        type: String,
      },
      fileOrder: {
        type: Number,
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Jobwbs", jobwbsSchema);
