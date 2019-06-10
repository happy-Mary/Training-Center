const util = require('util');

// Promisify
const fs = require('fs');
const stat = util.promisify(fs.stat);

const file = '4.util.js';
stat(file).then((stats) => {
    console.log(`'${file}' file size is ${stats.size} bytes`);
}).catch((error) => {
    console.error(error);
});


// Callbackify (WTF???)
async function fn() {
    return await Promise.resolve('hello world');
}
const callbackFunction = util.callbackify(fn);

callbackFunction((err, ret) => {
    if (err) throw err;
    console.log(`Promise value: '${ret}'`);
});


// Inspect
console.log(util.inspect({ property: 'text value', func: () => console.log('cool function!')}, { showHidden: true, depth: null, colors: true }));


// Deprecate
function myFunc() {
    console.log('My awesome function does awesome things.');
}
myFunc = util.deprecate(myFunc, 'Throw away your crappy function!');
myFunc();