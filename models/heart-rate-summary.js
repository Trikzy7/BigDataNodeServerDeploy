const mongoose = require("mongoose");

const summarySchema = mongoose.Schema({
  interval: { type: String, required: true }, // 'minute' or 'hour'
  timestamp: { type: Number, required: true }, // Start of the interval
  average: { type: Number, required: true }, // Average heart rate
});

module.exports = mongoose.model("Summary", summarySchema);
