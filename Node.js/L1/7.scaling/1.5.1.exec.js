var exec = require('child_process').exec;

var child = exec('net statistics Workstation', function(err, stdout, stderr) {
    if (err) {
        console.error(stderr);
    } else {
        console.log('Result: ' + stdout);
    }
});

console.log('Executed. Process ID: ' + child.pid);