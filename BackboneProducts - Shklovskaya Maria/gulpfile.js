var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglifyjs');


// server
gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true
    });
});

gulp.task('minscripts', function() {
    return gulp.src([
            "app/libs/underscore/underscore-min.js",
            "app/libs/jquery/dist/jquery.min.js",
            "app/libs/backbone/backbone-min.js",
            "app/libs/bootstrap/dist/js/bootstrap.min.js",
            "app/libs/matchHeight/jquery.matchHeight.js",
            "app/libs/Backbone.localStorage/build/backbone.localStorage.min.js"
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('sass', function() {
    gulp.src('app/sass/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(gulp.dest('app/css'))
});

gulp.task('css', ['sass'], function() {
    gulp.src('app/css/**/*.css')
        .pipe(livereload());
});

gulp.task('html', function() {
    gulp.src('**/**/*.html')
        .pipe(livereload());
});

gulp.task('js', function() {
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