var fs = require('fs');
var http = require('http');
var path = require('path');

http.createServer(function(req, res) {
    var p = path.join('.', req.url);
    // check whether path exists (file status)
    fs.stat(p, function(err, stats) {
        if (err) {
            res.writeHead(404);
            res.end(err.message);
            return;
        } else {
            console.log(stats);
        }

        // check whether path is file
        if (!stats.isFile) {
            res.writeHead(403);
            res.end();
        }

        // try to read the file
        fs.readFile(p, function(err, data) {
            if (err) {
                res.writeHead(500);
                res.end(err.message);
            } else {
                res.writeHead(200, { 'content-type': 'text/plain' });
                res.end(data);
            }
        });
    });
}).listen(1337);