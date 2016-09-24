'use strict';

var path = require('path');
var gulp = require('gulp');
var config = require('./config');

var angularProtractor = require('gulp-angular-protractor');


var connect = require('gulp-webserver');

var $ = require('gulp-load-plugins')();


function runProtractor (done) {
  var params = process.argv;
  var args = params.length > 3 ? [params[3], params[4]] : [];

  gulp.src(path.join('test/e2e'))
    .pipe(angularProtractor({
      configFile: 'test/protractor.conf.js',
      args: args,
        'autoStartStopServer': true,
        'debug': true
    }))
    .on('error', function (err) {
      // Make sure failed tests cause gulp to exit non-zero
        //console.log(err);
        config.stream.emit('kill');
      throw err;
    })
    .on('end', function () {
      // Close browser sync serve
      // connect.serverClose();
        config.stream.emit('kill');
      done();
    });
}

gulp.task('protractor', ['protractor:src']);
gulp.task('protractor:src', ['serve:e2e'], runProtractor);
gulp.task('protractor:dist', ['serve:e2e-dist'], runProtractor);
