var globals = require('../globals.js')

function watch() {

	global.isWatching = true;

	globals.gulp.watch( globals.config.paths.src.styles.all, globals.gulp.series('styles') );
	globals.gulp.watch( globals.config.paths.src.images.all, globals.gulp.series('images') );
	globals.gulp.watch( globals.config.paths.src.templates.all, globals.gulp.series('templates') );
};

globals.gulp.task('watch', watch);

module.exports = watch;
