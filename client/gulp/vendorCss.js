var gulp = require('gulp');
var concat = require('gulp-concat');
var config = require('./config');

//minify and concatenate all css
gulp.task('vendorCss', ['clean'], function() {
    return gulp.src(config.vendorcss)
        .pipe(concat('vendor.min.css'))
        .pipe(gulp.dest(config.dist + 'assets/styles'));
});
