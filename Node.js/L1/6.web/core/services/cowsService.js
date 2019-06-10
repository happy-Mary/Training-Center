var _ = require('lodash'),
    cowsRepo = require('../repositories/cowsRepo');

var service = {
    getCows: () => cowsRepo.getCows(),
    addCow: (cow) => cowsRepo.addCow(cow)
};

module.exports = service;