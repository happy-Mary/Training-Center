var fs = require('fs');
var http = require('http');

http.createServer(function(req, res) {
    // path to GET
    var p = './' + req.url;

    // try to read file
    fs.readFile(p, function(err, data) {
        if (err) {
            res.writeHead(500);
            res.end(err.message);
        } else {
            res.writeHead(200, { 'Content-type': 'text/plain' });
            res.end(data);
        }
    });
}).listen(1337);