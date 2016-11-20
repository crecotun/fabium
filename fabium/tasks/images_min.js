var globals = require('../globals.js')

var src = globals.getPath( globals.config.paths.dist.images.all ),
		dest = globals.getPath( globals.config.paths.dist.images.path )

function imagesMin() {
	return globals.gulp.src( src )
		.pipe(
			globals.$.plumber({
				errorHandler: globals.consoleError
			})
		)
		.pipe(
			globals.$.imagemin({
				progressive: true,
				svgoPlugins: [
					{
						removeViewBox: false
					}
				]
			})
		)
		.pipe( globals.gulp.dest( dest ) );
};

globals.gulp.task('images:min', imagesMin)

module.exports = imagesMin;
