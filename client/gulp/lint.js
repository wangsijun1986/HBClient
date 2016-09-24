var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var config = require('./config');

gulp.task('lint', function() {
    return gulp.src([config.base + 'app/**/*.js', '!' + config.base + '/app/vendor/**'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});
