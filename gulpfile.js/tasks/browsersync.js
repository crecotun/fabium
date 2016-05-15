var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	path = require('path'),
	browserSync = require('browser-sync'),
	config = require('../config'),
	consoleError = require('../utils/console_error'),
	PORT = process.env.PORT;

function bSync(cb) {

	browserSync({
		minify: false,
		injectChanges: true,
		files: [
			config.paths.dist.styles.all,
			config.paths.dist.scripts.all,
			config.paths.dist.templates.all,
			config.paths.dist.images.all
		],
		notify: false,
		open: false,
		ui: false,
		server: {
			baseDir: path.join(__dirname, '/../../dist')
		},
		port: PORT || 3000
	}, cb);

}

module.exports = bSync;
