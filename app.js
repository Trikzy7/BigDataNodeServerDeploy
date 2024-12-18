const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const app = express();

const heartRateRoutes = require("./routes/heart-rate");

// BDD Connexion
const url = "mongodb+srv://theo:theopassword@cluster0.bmdk5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    // "mongodb://tplebani:info734@193.48.125.44/tplebani?authMechanism=DEFAULT&authSource=admin";

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});


// ROUTES
app.use("/api/heart-rate", heartRateRoutes);

module.exports = app;
