var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function eslint() {
	return gulp.src( config.paths.src.scripts.all, {since: gulp.lastRun('scripts')} )
		.pipe(
			$.plumber({
				errorHandler: consoleError
			})
		)
		.pipe(
			$.eslint()
		);
};

module.exports = eslint;
