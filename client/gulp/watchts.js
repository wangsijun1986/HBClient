var gulp = require('gulp');
var config = require('./config');

gulp.task('watchts',function () {
  gulp.watch(config.base + '/app/**/**/*.ts', ['transpile']);
});
