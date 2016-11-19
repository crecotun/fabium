var globals = require('../globals.js')

var src = [
	globals.getPath( globals.config.paths.dist.styles.all ),
	'!' + globals.getPath( globals.config.paths.dist.styles.rtl.all ),
	'!' + globals.getPath( globals.config.paths.dist.styles.minified.all )
]

var dest = globals.getPath( globals.config.paths.dist.styles.path )

function stylesRTL() {
	return globals.gulp.src( src )
		.pipe( globals.$.rtlcss() )
		.pipe( globals.$.rename({
			suffix: '-rtl'
		}) )
		.pipe( globals.gulp.dest( dest ) )

};

globals.gulp.task('styles:rtl', stylesRTL);

module.exports = stylesRTL;
