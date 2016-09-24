var gulp = require('gulp');
var typescript = require('gulp-tsc');
var config = require('./config');

gulp.task('transpile', ['clean', 'vendorScripts'], function() {
    return gulp.src([
            config.base + 'app/**/**/*.ts',
	    ])
        .pipe(typescript())
        .pipe(gulp.dest(config.base + 'app'))
        .pipe(gulp.dest(config.dist + 'app'));
});
