var gulp = require('gulp');
var injectMe = require('gulp-inject');
var minifyHtml = require('gulp-minify-html');
var rev = require('gulp-rev');
var filter = require('gulp-filter');
var revReplace = require('gulp-rev-replace');
var config = require('./config');

//
// This is the final assembly task in our build chain.
// 
// There are four injection sites in our index.html file.  
// 
// 	inject:js
// 	inject:css
//	inject-vendor:js
//	inject-vendor:css
//
// Gulp's injectMe task guts the contents of each site and replaces it with a single minified file (build with the dependent tasks). 
//
gulp.task('html-inject', ['clean', 'scripts', 'vendorScripts', 'vendorFiles', 'vendorAssets', 'css', 'vendorCss', 'copyFonts', 'copyMaps', 'assets', 'copyImages'], function() {
	var index = config.base + 'index.html';
    	var minified = config.dist + '**/*.min.*';
        var minFilter = filter(['**/*.min.*']);
        var indexFilter = filter(['index.html']);

        var stream = gulp // Write the revisioned files
		.src([].concat(minified, index)) // add all staged min files and index.html
		.pipe(minFilter) // filter the stream to minified css and js
		.pipe(rev()) // create files with rev's
		.pipe(minFilter.restore()) // remove filter, back to original stream

		// inject the files into index.html
		.pipe(indexFilter) // filter to index.html
		.pipe(inject('assets/styles/vendor.min.css', 'inject-vendor'))
		.pipe(inject('assets/styles/nova.min.css'))
		.pipe(inject('/scripts/vendor.min.js', 'inject-vendor'))
		.pipe(inject('/scripts/hb.min.js'))
		.pipe(minifyHtml({empty: true}))
		.pipe(gulp.dest(config.dist)) // write the rev files
		.pipe(indexFilter.restore()) // remove filter, back to original stream

		// replace the files referenced in index.html with the rev'd files
		.pipe(revReplace())         // Substitute in new filenames
		.pipe(gulp.dest(config.dist)) // write the index.html file changes
		.pipe(rev.manifest()) // create the manifest (must happen last or we screw up the injection)
		.pipe(gulp.dest(config.dist)); // write the manifest
            
		function inject(path, name) {
			var dist =  config.dist + path;
			var options = {
				ignorePath: config.dist,
				read: false
			};
			if (name) { 
				options.name = name; 
			}
			return injectMe(gulp.src(dist), options);
		}
});

