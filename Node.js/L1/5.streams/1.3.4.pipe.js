var fs = require('fs');
var http = require('http');

var ws = fs.createWriteStream('index.json');
http.get('http://nodejs.org/dist/index.json', (res) => {
    res.setEncoding('utf8');
    res.pipe(ws);
});