var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	path = require('path'),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function templates() {
	return gulp.src( config.paths.src.templates.all, {since: gulp.lastRun('templates')} )
		.pipe(
			$.if(
				global.isWatching,
				$.pugInheritance({
					basedir: 'src/templates',
					extension: '.pug',
					skip: 'node_modules'
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
			$.pug({
				pretty: true
			})
		)
		.pipe( $.rename({dirname: '.'}) )
		.pipe( gulp.dest( config.paths.dist.path ) );
};

module.exports = templates;
