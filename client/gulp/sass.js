var gulp = require('gulp');
var sass = require('gulp-sass');
var config = require('./config');

gulp.task('sass', ['clean'], function() {
    return gulp.src(config.base + 'assets/styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(config.base + 'assets/styles'));
});

