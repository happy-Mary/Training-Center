const express = require('express');
const app = express();

let message = 'Hello you';

app.get('/', function(request, response) {
    console.log(message);
    response.end(message);
});

app.listen(3000);



