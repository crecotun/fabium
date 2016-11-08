var globals = require('../globals.js'),
		path = require('path'),
		browserSync = require('browser-sync'),
		PORT = process.env.PORT;

function bSync(cb) {

	browserSync({
		minify: false,
		injectChanges: true,
		files: [
			globals.config.paths.dist.styles.all,
			globals.config.paths.dist.scripts.all,
			globals.config.paths.dist.templates.all,
			globals.config.paths.dist.images.all
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

globals.gulp.task('browsersync', bSync);

module.exports = bSync;
