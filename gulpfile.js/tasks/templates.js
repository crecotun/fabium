var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function templates() {
	return gulp.src( config.paths.src.templates.pages.all )
		.pipe(
			$.jade({
				pretty: true
			})
		)
		.pipe( gulp.dest( config.paths.built.path ) );
};

module.exports = templates;
