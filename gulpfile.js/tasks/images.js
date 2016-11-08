var globals = require('../globals.js')

function images() {
	return globals.gulp.src( [globals.config.paths.src.images.all, '!'+globals.config.paths.src.sprites.images.all], {since: globals.gulp.lastRun('images')} )
		.pipe(
			globals.$.plumber({
				errorHandler: globals.consoleError
			})
		)
		.pipe( globals.gulp.dest( globals.config.paths.dist.images.path ) );
};

globals.gulp.task('images', images)

module.exports = images;
