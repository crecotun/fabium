const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

const config = require('../config')
const consoleError = require('../utils/console_error');

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
