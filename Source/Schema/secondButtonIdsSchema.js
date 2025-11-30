const mongoose = require("mongoose");

const secondButtonIdSchema = new mongoose.Schema({
  buttonIds: {
    type: [String], // Array of strings
    required: true,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const secondButtonIDs = mongoose.model("secondbuttonIDs", secondButtonIdSchema);

module.exports = secondButtonIDs;
