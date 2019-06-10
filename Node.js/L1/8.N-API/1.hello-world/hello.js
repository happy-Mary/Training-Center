var addon = require('bindings')('say');

console.log('Hello ' + addon.sayWorld());
