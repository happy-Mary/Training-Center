const fs = require('fs');
const zlib = require('zlib');

const readableStream = fs.createReadStream('hello.txt', 'utf8');
const writableStream = fs.createWriteStream('hello.txt.gz');

const gzip = zlib.createGzip();

readableStream.pipe(gzip).pipe(writableStream);
