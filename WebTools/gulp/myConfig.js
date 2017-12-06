var myGulp = require('./mygulp');
var uglify = require('uglify-js');

myGulp.src(['dist/text.js', 'dist/text2.txt'])
// how to rewrite this method
.transform(uglify.minify())
.pipe(myGulp.dest('build'));
