var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	stream = require('webpack-stream'),
	webpack = require('webpack'),
	gulplog = require('gulplog'),
	webpackConfig = require('../../webpack.config'),

	config = require('../config'),
	consoleError = require('../utils/console_error');

function scripts(cb) {
	var firstBuildReady = false;

	function done(err, stats) {
		firstBuildReady = true;

		if (err) return;

		gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
			// context: false,
			assets: false,
			colors: true,
			version: false,
			hash: false,
			chunkModules: false
		}))
	}

	return gulp.src( config.paths.src.scripts.all, {since: gulp.lastRun('scripts')} )
		.pipe(
			$.plumber({
				errorHandler: consoleError
			})
		)
		.pipe(stream(webpackConfig, webpack, done))
		.pipe(
			gulp.dest( config.paths.dist.scripts.path )
		)
		.on('data', function() {
			if (firstBuildReady) {
				cb();
			}
		});
};

module.exports = scripts;
