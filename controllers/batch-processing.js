const mongoose = require("mongoose");
const HeartRate = require("../models/heart-rate"); 
const Summary = require("../models/heart-rate-summary"); 

const url = "mongodb+srv://theo:theopassword@cluster0.bmdk5.mongodb.net/cleaned_data?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB", error));

async function calculateAverage(interval) {
  const now = new Date();
  const startTime = new Date(now.setSeconds(0, 0)).getTime();
  const endTime = startTime + 60 * 1000;

  const heartRates = await HeartRate.find({
    timestamp: { $gte: startTime, $lt: endTime }
  });

  if (heartRates.length === 0) {
    console.log(`No data found for minute interval starting at ${new Date(startTime).toISOString()}`);
    return;
  }

  const total = heartRates.reduce((sum, hr) => sum + hr.value, 0);
  const average = total / heartRates.length;

  const summary = new Summary({
    interval: "minute",
    timestamp: startTime,
    average,
  });

  await summary.save();
  console.log(`Saved minute average:`, average);
}

module.exports = { calculateAverage };
