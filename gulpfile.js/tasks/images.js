const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const config = require('../config')
const consoleError = require('../utils/console_error');

function images() {
	return gulp.src( [config.paths.src.images.all, '!'+config.paths.src.sprites.images.all] )
		.pipe(
			$.plumber({
				errorHandler: consoleError
			})
		)
		.pipe( gulp.dest( config.paths.built.images.path ) );
};

module.exports = images;
