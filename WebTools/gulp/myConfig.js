var myGulp = require('./mygulp');
var uglify = require('gulp-uglify');

myGulp.src(['dist/text.js', 'dist/text2.txt'])
// .pipe(uglify())
.pipe(myGulp.dest('build'));