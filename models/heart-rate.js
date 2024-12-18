const mongoose = require('mongoose');

const heartRateSchema = mongoose.Schema({
    timestamp: { type: Number, required: true },
    value: { type: Number, required: true }
  });


module.exports = mongoose.model('HeartRate', heartRateSchema);