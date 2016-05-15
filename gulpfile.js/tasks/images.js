var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function images() {
	return gulp.src( [config.paths.src.images.all, '!'+config.paths.src.sprites.images.all], {since: gulp.lastRun('images')} )
		.pipe(
			$.plumber({
				errorHandler: consoleError
			})
		)
		.pipe( gulp.dest( config.paths.dist.images.path ) );
};

module.exports = images;
