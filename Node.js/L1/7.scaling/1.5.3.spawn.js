var spawn = require('child_process').spawn;
var ps = spawn('cmd', ['/c', 'python microservice.py']);
ps.stdout.pipe(process.stdout);