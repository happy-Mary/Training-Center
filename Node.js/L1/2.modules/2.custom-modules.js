var myModule = require('./myModule.js');

myModule.doWork(function(result) {
    console.log('myModule.doWork: ' + result);
});
console.log('myModule.value: ' + myModule.value);



var util = require('util');
var myJson = require('./myJson.json');

console.log(util.format('My JSON: %j', myJson));
console.trace("Here I am!")