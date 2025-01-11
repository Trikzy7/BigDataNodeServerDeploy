const mongoose = require("mongoose");
const HeartRate = require("../models/heart-rate"); // Raw data model
const Summary = require("../models/heart-rate-summary"); // New model for summaries

const url = "mongodb+srv://theo:theopassword@cluster0.bmdk5.mongodb.net";

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, tls: true, tlsAllowInvalidCertificates: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));



// Calculate averages for a given interval
async function calculateAverage(interval) {
  const now = new Date();
  const startTime = new Date(
    interval === "minute" 
      ? now.setSeconds(0, 0) 
      : now.setMinutes(0, 0, 0)
  ).getTime();
  
  const endTime = interval === "minute" 
    ? startTime + 60 * 1000 
    : startTime + 60 * 60 * 1000; 

  const heartRates = await HeartRate.find({
    timestamp: { $gte: startTime, $lt: endTime }
  });

  if (heartRates.length === 0) {
    console.log(`No data found for ${interval} interval starting at ${new Date(startTime).toISOString()}`);
    return;
  }

  const total = heartRates.reduce((sum, hr) => sum + hr.value, 0);
  const average = total / heartRates.length;

  const summary = new Summary({
    interval,
    timestamp: startTime,
    average,
  });

  await summary.save();
  console.log(`Saved ${interval} average:`, average);
}

async function runBatchProcessing() {
  await calculateAverage("minute");
  await calculateAverage("hour");
  // mongoose.connection.close();
}

runBatchProcessing();
