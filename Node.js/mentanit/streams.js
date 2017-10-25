const fs = require('fs');

const writebaleStrieam = fs.createWriteStream('text.txt');
writebaleStrieam.write('Hello World');
writebaleStrieam.write("Продолжение записи \n");
writebaleStrieam.end('Writing ends');

const readableStream = fs.createReadStream('text.txt', 'utf-8');

readableStream.on('data', function(chunk) {
    console.log(chunk);
});