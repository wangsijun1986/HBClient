var gulp = require('gulp');

gulp.task('default', ['clean','transpile', 'scripts', 'images', 'assets', 'html-inject']);

