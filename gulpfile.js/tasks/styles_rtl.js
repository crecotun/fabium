var globals = require('../globals.js')

function stylesRTL() {
	return globals.gulp.src([
		globals.config.paths.dist.styles.all,
		'!'+globals.config.paths.dist.styles.rtl.all,
		'!'+globals.config.paths.dist.styles.minified.all
		])
		.pipe( globals.$.rtlcss() )
		.pipe( globals.$.rename({
			suffix: '-rtl'
		}) )
		.pipe( globals.gulp.dest(globals.config.paths.dist.styles.path) )
};

globals.gulp.task('styles:rtl', stylesRTL);

module.exports = stylesRTL;
