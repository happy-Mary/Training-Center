var router = require('express').Router();

var cowsService = require('../core/services/cowsService');

router.get('/', function (req, res, next) {
    cowsService.getCows().then(data => {
        res.json(data);
    }).catch(next);
});

router.post('/', function (req, res, next) {
    cowsService.addCow(req.body).then(data => {
        res.json(req.body);
    }).catch(next);
});

module.exports = router;