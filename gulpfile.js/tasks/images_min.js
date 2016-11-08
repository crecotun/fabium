var globals = require('../globals.js')

function imagesMin() {
	return globals.gulp.src( [globals.config.paths.dist.images.all] )
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
		.pipe( globals.gulp.dest( globals.config.paths.dist.images.path ) );
};

globals.gulp.task('images:min', imagesMin)

module.exports = imagesMin;
