var gulp = require('gulp');
var concat = require('gulp-concat');
var config = require('./config');

// bundle, minify and copy the vendor javascript files
gulp.task('vendorScripts', ['clean'], function() {
    return gulp.src(config.vendorjs) 
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(config.dist + 'scripts'));
});
