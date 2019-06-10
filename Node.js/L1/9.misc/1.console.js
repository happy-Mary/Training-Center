// colors
console.dir({myObject: 'stringValue', bankAccountbBalance: 100000000}, {colors: true});


// console.time
console.time('100-elements');
for (let i = 0; i < 100; i++) {
}
console.timeEnd('100-elements');


// console.count
console.count('abc');
console.count('xyz');
console.count('abc');
console.countReset('abc');
console.count('abc');