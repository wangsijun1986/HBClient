var gulp = require('gulp');
var del = require('del');
var config = require('./config');

//clean the dist directory
gulp.task('clean', function(cb) {
 del([	
	config.dist + 'fonts/**', 
	config.dist + 'styles/**', 
	config.dist + 'scripts/**', 	
	config.dist + 'assets/**', 	
	config.dist + 'index.html', 
	config.dist + 'rev-manifest.json'], cb);
});

