const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nodeSchema = new Schema(
  {
    nameNode: {
      type: String,
      unique: true,
      // required: true,
    },
    peaNode: {
      type: String,
      // required: true,
    },
    explainNode: {
      type: String,
      // required: true,
    },
    userNode: {
      type: String,
      // required: true,
    },
    codeNode: {
      type: String,
      // required: true,
    },
    departmentFullNameNode: {
      type: String,
      // required: true,
    },
    dateNode: {
      type: String,
      // required: true,
    },
    nodeStatus: [
      {
        orderStatus: {
          type: String,
        },
        nameStatus: {
          type: String,
          required: true,
        },
        explainStatus: {
          type: String,
        },
        buttonInput: {
          type: String,
          default: "true",
        },
        statusStep: [
          {
            stepOrder: {
              type: String,
            },
            stepName: {
              type: String,
            },
            stepExplain: {
              type: String,
            },
            stepWarning: {
              type: String,
            },
            stepNext: {
              type: String,
            },
            stepMake: {
              type: String,
            },
            stepFile: [
              {
                fileOrder: {
                  type: String,
                },
                fileName: {
                  type: String,
                },
                fileDetail: {
                  type: String,
                },
                fileUrl: {
                  type: String,
                },
              },
            ],
            detailDone: [
              {
                idDetail: {
                  type: String,
                },
              },
            ],
          },
        ],
      },
    ],
    nodeDetail: [
      {
        modelInput1: {
          type: String,
        },
        modelInput2: {
          type: String,
        },
        modelInput3: {
          type: String,
        },
        modelInput4: {
          type: String,
        },
        modelInput5: {
          type: String,
        },
        modelInputStatusName: {
          type: String,
        },
        modelInputStatusId: {
          type: String,
        },
        // stepDone: [
        //   {
        //     idStepDone: {
        //       type: String,
        //     },
        //   },
        // ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Node", nodeSchema);
