var math = require('mathjs');

var epsilon = math.round(math.e, 3);
var expression = math.atan2(3, -3) / epsilon;
var f = 5;
document.getElementById('expression').innerHTML = expression;