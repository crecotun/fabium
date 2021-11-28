const gulp = require('gulp')
const config = require('./config.json')
const consoleError = require('./utils/console_error')
const getPath = require('./utils/get_path')
const $ = require('gulp-load-plugins')()

module.exports = {
	gulp: gulp,
	config: config,
	consoleError: consoleError,
	$: $,
	path: path,
	getPath: getPath,
	PWD: process.cwd(),
}
