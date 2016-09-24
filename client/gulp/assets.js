//
// Miscellaneous assets: video, json, etc.
//
var gulp = require('gulp');
var changed = require('gulp-changed');
var config = require('./config');

var folders = {
    video: config.base + 'assets/video/**',
    content: config.base + 'assets/content/**',
    target: config.dist + 'assets/'
};

gulp.task('assets', ['clean'], function() {
    gulp.src(folders.video).pipe(changed(folders.video)).pipe(gulp.dest(folders.target + 'video'));
    gulp.src(folders.content).pipe(changed(folders.content)).pipe(gulp.dest(folders.target + 'content'));
});
