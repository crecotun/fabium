var globals = require('../globals.js')

var src = globals.getPath( globals.config.paths.src.images.all ),
		dest = globals.getPath( globals.config.paths.dist.images.path )

function images() {
	return globals.gulp.src( src )
		.pipe(
			globals.$.plumber({
				errorHandler: globals.consoleError
			})
		)
		.pipe(
			globals.$.newer( dest )
		)
		.pipe( globals.gulp.dest( dest ) );
};

globals.gulp.task('images', images)

module.exports = images;
