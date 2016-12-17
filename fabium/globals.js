var gulp = require('gulp'),
		config = require('./config.json'),
		consoleError = require('./utils/console_error'),
		getPath = require('./utils/get_path')
		$ = require('gulp-load-plugins')()

module.exports = {
	gulp: gulp,
	config: config,
	consoleError: consoleError,
	$: $,
	path: path,
	getPath: getPath,
	PWD: process.cwd()
}
