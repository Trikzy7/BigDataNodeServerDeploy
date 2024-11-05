const express = require('express');
const heartRate = require('../controllers/heart-rate');

const router = express.Router();

router.post('/receive-hr-data', heartRate.receiveHrData);


module.exports = router;