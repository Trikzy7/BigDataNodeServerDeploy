const express = require('express');
const heartRate = require('../controllers/heart-rate');

const router = express.Router();

router.post('/receive-hr-data', heartRate.receiveHrData);
router.post('/insert-mongodb-hr-data', heartRate.insertMongoDB);


module.exports = router;