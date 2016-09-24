var gulp = require('gulp');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var config = require('./config');

//minify and concatenate all css
gulp.task('css', ['sass'], function() {
    return gulp.src([config.base + 'assets/styles/*.css', config.base + 'app/vendor/*.css' ])
        //.pipe(minify())
        .pipe(concat('hb.min.css'))
        .pipe(gulp.dest(config.dist + 'assets/styles'));
});
