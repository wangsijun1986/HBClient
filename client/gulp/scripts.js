var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var config = require('./config');

// minify & concatenate js
gulp.task('scripts', ['clean','transpile' ,'templates'], function() {
    return gulp.src([
            config.base + 'app/app.module.js', // all module definitions and their dependencies
            config.base + 'app/app.config.js',
            config.dist + 'app/**/**/*.js', '!' + config.base + 'app/modules/**',
            config.dist + 'scripts/templates.js'
	    ])
        .pipe(sourcemaps.init())
        .pipe(concat('hb.min.js'))
        //.pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(config.dist + 'scripts'));
});
