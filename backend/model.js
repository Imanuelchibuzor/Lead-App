const mongoose = require("mongoose");

const LeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    status: {
      type: String,
      enum: [
        "New",
        "Engaged",
        "Proposal Sent",
        "Closed-Won",
        "Closed-Lost",
      ],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", LeadSchema);

module.exports = Lead;
