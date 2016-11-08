var gulp = require('gulp'),
		config = require('./config.json'),
		consoleError = require('./utils/console_error'),
		$ = require('gulp-load-plugins')()

module.exports = {
	gulp: gulp,
	config: config,
	consoleError: consoleError,
	$: $
}
