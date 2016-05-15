var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function bower() {
	return $.bower( config.paths.dist.libs );
};

module.exports = bower;
