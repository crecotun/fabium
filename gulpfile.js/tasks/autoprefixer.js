var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	autoprefixer = require('autoprefixer'),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function prefixer() {
	return gulp.src( config.paths.built.styles.all )
		.pipe(
			$.postcss(
				[ autoprefixer() ]
			)
		)
		.pipe( gulp.dest( config.paths.built.styles.path ) );
};

module.exports = prefixer;
