var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	autoprefixer = require('autoprefixer'),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function styles() {
	return gulp.src( config.paths.src.styles.main )
		.pipe(
			$.plumber({
				errorHandler: consoleError
			})
		)
		.pipe( $.sass() )
		.pipe(
			$.postcss(
				[
					autoprefixer({
						browsers: ['last 2 versions'],
						cascade: false
					})
				]
			)
		)
		.pipe( gulp.dest( config.paths.dist.styles.path ) );
};

module.exports = styles;
