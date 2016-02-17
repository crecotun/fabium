var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function stylesMin() {
	return gulp.src( [config.paths.built.styles.all, '!'+config.paths.built.styles.all_minified] )
		.pipe(
			$.plumber({
				errorHandler: consoleError
			})
		)
		.pipe( $.minifyCss() )
		.pipe(
			$.rename( function(path) {
				path.basename += '.min';
			})
		)
		.pipe( gulp.dest( config.paths.built.styles.path ) );
};

module.exports = stylesMin;
