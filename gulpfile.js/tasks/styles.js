var globals = require('../globals.js')

function styles() {
	return globals.gulp.src( globals.config.paths.src.styles.main )
		.pipe(
			globals.$.plumber({
				errorHandler: globals.consoleError
			})
		)
		.pipe( globals.$.postcss(globals.postcssProcessors, { parser: globals.sugarss } ) )
		.pipe(
			globals.$.rename(function(path){
				path.extname = '.css'
			})
		)
		.pipe( globals.gulp.dest( globals.config.paths.dist.styles.path ) );
};

globals.gulp.task('styles', styles);

module.exports = styles;
