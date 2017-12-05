var myGulp = require('./mygulp');

myGulp.src(['dist/text.js', 'dist/text2.js'])
.pipe(myGulp.dest('build'));