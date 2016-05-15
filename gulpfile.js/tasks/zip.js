var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function zipSrc() {
	return gulp.src([config.paths.src.all])
		.pipe( $.zip('project_src.zip') )
		.pipe(
			gulp.dest( config.paths.archives.path )
		);
}

function zipDist() {
	return gulp.src([config.paths.dist.all])
		.pipe( $.zip('project_dist.zip') )
		.pipe(
			gulp.dest( config.paths.archives.path )
		);
}

module.exports = {
	zipSrc: zipSrc,
	zipDist: zipDist
}
