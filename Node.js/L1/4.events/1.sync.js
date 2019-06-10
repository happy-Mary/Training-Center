var fs = require("fs");
var data = fs.readFileSync('text.txt');
console.log('Lines count: ' + data.toString().split('\n').length);
console.log("Done!");
