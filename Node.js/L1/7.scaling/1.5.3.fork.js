var fork = require('child_process').fork;
var child = fork(__dirname + '/child.js');

child.on('message', function(data){
    console.log('Result: ' + data.result);
    child.send({ cmd: 'finish' });
});

child.send({ cmd: 'sum', val1: 2, val2: 2 });