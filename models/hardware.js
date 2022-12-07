const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hardwareSchema = new Schema(
  {
    codeNumber: {
      type: String,
      unique: true,
      // required: true,
    },
    nameHardware: {
      type: String,
      // required: true,
    },
    unit: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hardware", hardwareSchema);
