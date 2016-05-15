var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	
	config = require('../config'),
	consoleError = require('../utils/console_error');

function imagesMin() {
	return gulp.src( [config.paths.dist.images.all] )
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
				]
			})
		)
		.pipe( gulp.dest( config.paths.dist.images.path ) );
};

module.exports = imagesMin;
