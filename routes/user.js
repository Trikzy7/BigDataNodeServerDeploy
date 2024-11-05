const express = require('express');
const userCtrl = require('../controllers/user');

const router = express.Router();

router.post('/receive-hr-data', userCtrl.receiveHrData);


module.exports = router;