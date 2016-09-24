var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var minifyHTML = require('gulp-minify-html');
var config = require('./config');

// minfy and insert partials into templatecache
gulp.task('templates', function () {
    return gulp.src(config.base + 'app/templates/**/*.html')
    	.pipe(minifyHTML({empty: true}))
        .pipe(templateCache('templates.js', {
        	root: '/app',
        	module: 'hb.templates'
        }))
        .pipe(gulp.dest(config.dist + 'scripts')); 
});
