const express = require('express');

const router = express.Router();



router.use('/data', require('./data'));
router.use('/service', require('./service'));
router.use('/personaldata', require('./personaldata'));

module.exports = router;
