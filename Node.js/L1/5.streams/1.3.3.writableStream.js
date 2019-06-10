var fs = require('fs');
var ws = fs.createWriteStream('test.txt');
var rs = fs.createReadStream('test.txt');

rs.on('data', function(data) {
   console.log('Data written: ' + data); 
});

rs.on('end', function() {
   console.log('Reading done!'); 
});

ws.on('finish', function() {
    console.log('Writing done!');
});

ws.write('Hello ');
ws.write('world');
ws.end('!');

// Class: stream.Writable
// writable.write(chunk, [encoding], [callback])
// Event: 'drain'
// writable.end([chunk], [encoding], [callback])
// Event: 'finish'
// Event: 'pipe'
// Event: 'unpipe'
// Event: 'error'var fs = require('fs');