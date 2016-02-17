var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	pngcrush = require('imagemin-pngcrush'),
	config = require('../config'),
	consoleError = require('../utils/console_error');

function imagesMin() {
	return gulp.src( [config.paths.built.images.all] )
		.pipe(
			$.plumber({
				errorHandler: consoleError
			})
		)
		.pipe(
			$.imagemin({
				progressive: true,
				svgoPlugins: [
					{
						removeViewBox: false
					}
				],
				use: [
					pngcrush()
				]
			})
		)
		.pipe( gulp.dest( config.paths.built.images.path ) );
};

module.exports = imagesMin;
