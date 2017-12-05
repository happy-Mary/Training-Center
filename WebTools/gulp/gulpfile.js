var gulp = require('gulp'),
uglify = require('gulp-uglify');

gulp.task('default', function () {
    var test = gulp.src(['dist/text.js']);
    console.log(test);
   
   test.pipe(uglify())
    .pipe(gulp.dest('build'));
});