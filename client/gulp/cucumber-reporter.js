var gulp = require('gulp');
var config = require('./config');


var Report = require('cucumber-html-report');




/**
 * Run test once and exit
 */

gulp.task('reporter', function (done) {
    var options = {
        source: 'test/cucumber_report.json', // source json
        dest: 'test/reports', // target directory (will create if not exists)
        name: 'report.html', // report file name (will be index.html if not exists)
        template: 'test/cucumber/report-templates/default.html' // your custom mustache template (uses default if not specified)
    };

    var report = new Report(options);
    report.createReport();
    done();
});
