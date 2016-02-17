var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../config');

function watch() {
	gulp.watch( config.paths.src.scripts.all, gulp.series('scripts') );
	gulp.watch( config.paths.src.styles.all, gulp.series('styles') );
	gulp.watch( config.paths.src.images.all, gulp.series('images') );
	gulp.watch( config.paths.src.sprites.images.all, ['sprite'] );
	gulp.watch( config.paths.src.templates.all, ['jade'] );
};

module.exports = watch;
