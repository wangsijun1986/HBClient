var gulp = require('gulp');
var karma = require('karma').server;
var path = require('path');
var config = require('./config');

/**
 * Run test once and exit
 */

gulp.task('test', function (done) {
      var karmaConfig = path.join(__dirname, '..', '/' + config.base + 'test/karma.conf.js');
      karma.start({
          configFile: karmaConfig,
          singleRun: true
      }, done);
});
