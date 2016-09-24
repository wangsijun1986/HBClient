var gulp = require('gulp');

var config = require('./config');

gulp.task('copyFonts', ['clean'], function() {
    return gulp.src(['node_modules/font-awesome/fonts/**', 'node_modules/bootstrap/fonts/**', 'node_modules/slick-carousel/slick/fonts/**','assets/fonts/**'])
        .pipe(gulp.dest(config.dist + 'assets/fonts'));
});

//
// Deposit debug maps into the scripts folder. Everything in scripts gets versioned so you
// will see all of the files in config.vendormap plus revisioned (copied with a revision in
// the file name) in dist/scripts. 
// 
gulp.task('copyMaps', ['clean'], function() {
    return gulp.src(config.vendormap)
        .pipe(gulp.dest(config.dist + 'scripts'));
});

gulp.task('copyImages', ['clean'], function() {
    return gulp.src(['node_modules/slick-carousel/slick/ajax-loader.gif' ])
        .pipe(gulp.dest(config.dist + 'assets/images'));
});

