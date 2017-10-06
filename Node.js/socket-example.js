var fs = require('fs');
var express = require('express');
var app = express();
var server = app.listen(1337);
var io = require('socket.io').listen(server);

//index.html
app.get('/', function(req, res) {
    var stream = fs.createReadStream('./index.html');
    stream.on('error', function(err) {
        res.json(400, { error: err.message });
    });
    stream.pipe(res);
});

// sockets
io.sockets.on('connection', function(client) {
    // send a message to the client every five seconds
    setInterval(function() {
        client.emit('From server', { message: 'Ping' + new Date() });
    }, 5000);

    // send a message to the client every five seconds
    client.on('client_event', function(msg) {
        console.log(msg);
    });
});