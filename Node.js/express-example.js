var express = require('express');
var app = express();

app.listen(1337);

app.get('/*', function(req, res) {
    res.status(200).send('Hello, world! Express is here');
});