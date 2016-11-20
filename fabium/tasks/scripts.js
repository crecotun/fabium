var globals = require('../globals.js'),
		stream = require('webpack-stream'),
		webpack = require('webpack'),
		gulplog = require('gulplog'),
		webpackConfig = require( globals.getPath( 'fabium/webpack.config' ) )

var src = globals.getPath( globals.config.paths.src.scripts.all ),
		dest = globals.getPath( globals.config.paths.dist.scripts.path )

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

	return globals.gulp.src( src, {since: globals.gulp.lastRun('scripts')} )
		.pipe(
			globals.$.plumber({
				errorHandler: globals.consoleError
			})
		)
		.pipe(stream(webpackConfig, webpack, done))
		.pipe(
			globals.gulp.dest( dest )
		)
		.on('data', function() {
			if (firstBuildReady) {
				cb();
			}
		});
};

globals.gulp.task('scripts', scripts);

module.exports = scripts;
