const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const config = require('../config')
const consoleError = require('./console_error');

function styles() {
	return gulp.src( config.paths.src.styles.main )
		.pipe(
			$.plumber({
				errorHandler: consoleError
			})
		)
		.pipe( $.stylus() )
		.pipe( gulp.dest( config.paths.built.styles.path ) );
};

module.exports = styles;
