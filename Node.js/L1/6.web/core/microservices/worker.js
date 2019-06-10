const cowsService = require('../services/cowsService');

setInterval(() => cowsService.getCows().then((cows) => console.log(cows.val())).catch(console.error), 5000);
