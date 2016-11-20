var globals = require('../globals.js'),
		path = require('path'),
		browserSync = require('browser-sync'),
		PORT = process.env.PORT;

var files = [
	globals.getPath( globals.config.paths.dist.styles.all ),
	globals.getPath( globals.config.paths.dist.scripts.all ),
	globals.getPath( globals.config.paths.dist.templates.all ),
	globals.getPath( globals.config.paths.dist.images.all )
]

function bSync(cb) {

	browserSync({
		minify: false,
		injectChanges: true,
		files: files,
		notify: false,
		open: false,
		ui: false,
		server: {
			baseDir: globals.getPath( globals.config.paths.dist.path )
		},
		port: PORT || 3000
	}, cb);

}

globals.gulp.task('browsersync', bSync);

module.exports = bSync;
