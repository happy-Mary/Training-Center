var path = require('path');

myFilePath = '/someDir/nestedDir/someFile.json';
console.dir(path.parse(myFilePath), {colors: true});