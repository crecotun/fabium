var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function scriptsMin() {
	return gulp.src( [config.paths.built.scripts.all, '!'+config.paths.built.scripts.all_minified] )
		.pipe(
			$.plumber({
				errorHandler: consoleError
			})
		)
		.pipe( $.uglify() )
		.pipe(
			$.rename( function(path) {
				path.basename += '.min';
			})
		)
		.pipe( gulp.dest( config.paths.built.scripts.path ) );
};

module.exports = scriptsMin;
