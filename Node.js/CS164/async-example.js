var async = require('async');
var fs = require('fs');
var http = require('http');
var path = require('path');
var _ = require('underscore');

http.createServer(function(req, res) {
    var p = path.join('.', req.url);

    // do the following in series
    async.series([
        // check whether path exists (file status)
        function(callback) {
            fs.stat(p, function(err, stats) {
                if (err) {
                    return callback(err);
                }
                // check whether path is file
                if (!stats.isFile) {
                    return callback(new Error('not a file'));
                }
                callback(null);
            });
        },
        function(callback) {
            // try to read the file
            fs.readFile(p, function(err, data) {
                if (err) {
                    return callback(err);
                }
                return callback(null, data);
            });
        }
    ], function(err, results) {
        if (err) {
            res.writeHead(400);
            res.end(err.message);
        } else {
            console.log(results);
            res.end(_.last(results));
        }
    });
}).listen(1337);