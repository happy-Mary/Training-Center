var myModule = require('./folder-module');

myModule.doWork(function(result) {
    console.log('myModule.doWork: ' + result);
});
console.log('myModule.value: ' + myModule.value);