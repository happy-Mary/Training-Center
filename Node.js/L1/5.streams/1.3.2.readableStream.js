var http = require('http');

http.get('http://nodejs.org/dist/index.json', (res) => {
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
        console.log('------------------------------------');
        console.log(chunk);
    });
    res.on('end', () => {
        console.log('No more data!');
    });
});


// Class: stream.Readable
// Event: 'readable'
// Event: 'data'
// Event: 'end'
// Event: 'close'
// Event: 'error'
// readable.read([size])
// readable.setEncoding(encoding)
// readable.resume()
// readable.pause()
// readable.pipe(destination, [options])
// readable.unpipe([destination])
// readable.unshift(chunk)
// readable.wrap(stream)var request = require('request');