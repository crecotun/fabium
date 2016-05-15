var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function stylesMin() {
	return gulp.src( [config.paths.dist.styles.all, '!'+config.paths.dist.styles.minified.all] )
		.pipe(
			$.plumber({
				errorHandler: consoleError
			})
		)
		.pipe( $.csso() )
		.pipe(
			$.rename( function(path) {
				path.basename += '.min';
			})
		)
		.pipe( gulp.dest( config.paths.dist.styles.path ) );
};

module.exports = stylesMin;
