var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	path = require('path'),
	browserSync = require('browser-sync'),
	config = require('../config'),
	consoleError = require('../utils/console_error');

function bSync(cb) {

	browserSync({
		minify: false,
		injectChanges: true,
		files: [
			config.paths.built.styles.all,
			config.paths.built.scripts.all,
			config.paths.built.templates.all,
			config.paths.built.images.all
		],
		notify: false,
		open: false,
		server: {
			baseDir: path.join(__dirname, '/../../dist')
		},
		port: 3000
	}, cb);

}

module.exports = bSync;
