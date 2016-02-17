var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function styles() {
	return gulp.src( config.paths.src.styles.main, {since: gulp.lastRun('styles')} )
		.pipe(
			$.plumber({
				errorHandler: consoleError
			})
		)
		.pipe( $.stylus() )
		.pipe( gulp.dest( config.paths.built.styles.path ) );
};

module.exports = styles;
