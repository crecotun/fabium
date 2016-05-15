var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function scriptsMin() {
	return gulp.src( [config.paths.dist.scripts.all, '!'+config.paths.dist.scripts.all_minified] )
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
		.pipe( gulp.dest( config.paths.dist.scripts.path ) );
};

module.exports = scriptsMin;
