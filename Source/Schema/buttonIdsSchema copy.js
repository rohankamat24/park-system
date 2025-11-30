const mongoose = require("mongoose");

const buttonIdSchema = new mongoose.Schema({
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

const ButtonIDs = mongoose.model("ButtonIDs", buttonIdSchema);

module.exports = ButtonIDs;
