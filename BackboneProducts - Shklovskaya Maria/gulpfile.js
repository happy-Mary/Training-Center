var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');


// server
gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true
    });
});
  
gulp.task('sass', function(){
    gulp.src('app/sass/**/*.scss')
    .pipe(sass())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('app/css'))
    // .pipe(connect.reload());
});

gulp.task('css', ['sass'], function(){
    gulp.src('app/css/**/*.css')
    .pipe(livereload());
});

gulp.task('html', function(){
    gulp.src('**/**/*.html')
    .pipe(livereload());
});

gulp.task('js', function(){
    gulp.src('app/js/**/*.js')
    .pipe(livereload());
});

gulp.task('watch', function() {
    gulp.watch('app/sass/**/*.scss', ['sass'])
    gulp.watch('app/css/**/*.css', ['css'])
    gulp.watch('**/**/*.html', ['html'])
    gulp.watch('app/js/**/*.js', ['js']);
});

gulp.task('default', ['connect', 'watch']);

// add task build for minifying files


