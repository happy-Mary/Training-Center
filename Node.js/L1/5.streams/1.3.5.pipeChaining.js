var fs = require('fs');;
var http = require('http');
var zlib = require('zlib');

var ws = fs.createWriteStream('index.json.gz');
http.get('http://nodejs.org/dist/index.json', (res) => {
    res.setEncoding('utf8');
    res.pipe(zlib.createGzip()).pipe(ws);
});


