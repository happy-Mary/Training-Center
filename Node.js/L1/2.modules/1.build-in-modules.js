// Build-in modules
// Uses CommonJS notation

// fs
var fs = require('fs');

fs.exists('myModule.js', function (exists) {
  console.log('myModule.js exists: ' + exists);
});


// http
var https = require('https');

https.get('https://www.tut.by', function(res) {
  console.log("Got response: " + res.statusCode);
}).on('error', function(e) {
  console.log("Ooopps: " + e.message);
});

// os
var os = require('os');

console.log('OS uptime(seconds): ' + os.uptime());

// util
var util = require('util');

console.log(util.format('%s/%s: %d', 'USD', 'BYN', '1.92'));

// All build-in modules:
//   'assert', 'buffer', 'child_process', 'cluster',
//   'crypto', 'dgram', 'dns', 'domain', 'events', 'fs', 'http', 'https', 'net',
//   'os', 'path', 'punycode', 'querystring', 'readline', 'stream',
//   'string_decoder', 'tls', 'tty', 'url', 'util', 'vm', 'zlib', 'smalloc',
//   'tracing'