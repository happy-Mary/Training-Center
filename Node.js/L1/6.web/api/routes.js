var express = require('express');
var router = express.Router();

var cows = require('./cows');

router.use('/cows', cows);

module.exports = router;