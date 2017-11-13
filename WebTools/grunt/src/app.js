let math = require('mathjs');

let epsilon = Math.round(math.e, 3);
let expression = Math.atan2(3, -3) / epsilon;
document.getElementById('expression').innerHTML = expression;