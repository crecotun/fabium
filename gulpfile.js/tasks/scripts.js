var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function scripts() {
	return gulp.src( config.paths.src.scripts.all, {since: gulp.lastRun('scripts')} )
		.pipe(
			$.plumber({
				errorHandler: consoleError
			})
		)
		.pipe(
			$.babel({
				presets: ['es2015']
			})
		)
		.pipe( gulp.dest( config.paths.dist.scripts.path ) );
};

module.exports = scripts;
