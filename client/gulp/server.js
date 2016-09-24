'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');
var config = require('./config');


function connectServer(location) {

    config.stream =  gulp.src('./')
            .pipe(webserver({
                fallback: 'index.html',
                port: 3000,
                directoryListing: {
                    enable: true,
                    path: 'client'
                }
            }));
}

gulp.task('serve:dist', ['build'], function () {
    connectServer('client/dist');
});

gulp.task('serve:e2e', [], function () {
    connectServer('client', 'webdriver-standalone');
});

gulp.task('serve:e2e-dist', ['build', 'webdriver-standalone'], function () {
    connectServer('client/dist');
});
