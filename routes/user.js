const express = require('express');
const userCtrl = require('../controllers/user');

const router = express.Router();

router.get('/receive-hr-data', userCtrl.receiveHrData);


module.exports = router;