var http = require('http');
// create http server
var server = http.createServer();
// handler for requests
function handler(req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write('Hello world');
    // closing the connection and sending data to browser
    res.end();
    console.log(req.url);
}

// handle requests with handler
server.on('request', handler);
// listen on port 1337
server.listen(1337);

// comand to start server: node http-example.js

http.createServer(function(req, res) {
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write('Hello world');
    res.end();
    console.log(req.url);
}).listen(1337);