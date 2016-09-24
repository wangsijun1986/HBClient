var gulp = require('gulp');
var changed = require('gulp-changed');
var config = require('./config');

gulp.task('images', ['clean'], function() {
    return gulp.src(config.base + 'assets/images/**')
        .pipe(changed(config.dist + 'assets/images'))
        .pipe(gulp.dest(config.dist + 'assets/images'));
});
