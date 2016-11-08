var globals = require('../globals.js')

function images() {
	return globals.gulp.src( globals.config.paths.src.images.all )
		.pipe(
			globals.$.plumber({
				errorHandler: globals.consoleError
			})
		)
		.pipe(
			globals.$.newer(globals.config.paths.dist.images.path)
		)
		.pipe( globals.gulp.dest( globals.config.paths.dist.images.path ) );
};

globals.gulp.task('images', images)

module.exports = images;
