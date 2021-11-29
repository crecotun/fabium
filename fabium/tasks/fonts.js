var globals = require('../globals.js')

var src = globals.getPath( globals.config.paths.src.fonts.all ),
		dest = globals.getPath( globals.config.paths.dist.fonts.path )

function fonts() {
	return globals.gulp.src( src )
		.pipe(
			globals.$.plumber({ errorHandler: globals.consoleError })
		)
		.pipe(
			globals.$.newer( dest )
		)
		.pipe( globals.gulp.dest( dest ) );
};

globals.gulp.task('fonts', fonts)

module.exports = fonts;
