var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function stylesRTL() {
	return gulp.src([
		config.paths.dist.styles.all,
		'!'+config.paths.dist.styles.rtl.all,
		'!'+config.paths.dist.styles.minified.all
		])
		.pipe( $.rtlcss() )
		.pipe( $.rename({
			suffix: '-rtl'
		}) )
		.pipe( gulp.dest(config.paths.dist.styles.path) )
};

module.exports = stylesRTL;
