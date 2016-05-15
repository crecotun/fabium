var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function templates() {
	return gulp.src( config.paths.src.templates.all, {since: gulp.lastRun('templates')} )
		.pipe(
			$.if(
				global.isWatching,
				$.jadeInheritance({
					basedir: 'src/templates'
				})
			)
		)
		.pipe(
			$.filter(
				function(file) {
					return /[\\\/]pages/.test(file.path);
				}
			)
		)
		.pipe(
			$.jade({
				pretty: true
			})
		)
		.pipe( $.rename({dirname: '.'}) )
		.pipe( gulp.dest( config.paths.dist.path ) );
};

module.exports = templates;
