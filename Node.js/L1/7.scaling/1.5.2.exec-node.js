var exec = require('child_process').exec;

exec('node microservice.js', { env: { WAIT: 3000 } }, function(err, stdout, stderr) {
    if (err) {
        console.error(stderr);
    } else {
        console.log(stdout);
    }
});