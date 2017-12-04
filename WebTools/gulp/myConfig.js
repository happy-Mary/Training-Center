var myGulp = require('./mygulp');

myGulp.src(['dist/text.txt', 'dist/text2.txt']).pipe(myGulp.dest('build'));