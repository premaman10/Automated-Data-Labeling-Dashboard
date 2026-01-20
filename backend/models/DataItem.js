const mongoose = require("mongoose");

const DataItemSchema = new mongoose.Schema({
  rawData: Object,
  aiLabel: String,
  finalLabel: String,
  status: {
    type: String,
    default: "PENDING"
  }
});

module.exports = mongoose.model("DataItem", DataItemSchema);
 