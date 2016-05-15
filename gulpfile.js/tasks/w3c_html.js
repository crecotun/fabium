var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function w3cHTML(cb) {
	return gulp.src(config.paths.dist.templates.all)
		.pipe(
			$.plumber({
				errorHandler: consoleError
			})
		)
		.pipe( $.w3cjs() )
		.pipe( $.w3cjs.reporter() );
}

module.exports = w3cHTML;
