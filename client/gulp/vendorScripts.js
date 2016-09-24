var gulp = require('gulp');
var concat = require('gulp-concat');
var config = require('./config');

// copy vendor.min.js to /dist/scripts 
gulp.task('vendorScripts', ['clean'], function() {
    return gulp.src(config.vendorjs)
        .pipe(concat('vendor.min.js'))
        .pipe(gulp.dest(config.dist + 'scripts'));
});

gulp.task('vendorFiles', ['clean'], function() {
    return gulp.src(config.vendorfiles)
        .pipe(gulp.dest(config.dist + 'scripts'));
});

gulp.task('vendorAssets', ['clean'], function() {
    return gulp.src(config.vendorassets)
        .pipe(gulp.dest(config.dist + 'assets/styles'));
});
