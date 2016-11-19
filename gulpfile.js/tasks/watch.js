var globals = require('../globals.js')

var paths = {
	styles: globals.getPath( globals.config.paths.src.styles.all ),
	images: globals.getPath( globals.config.paths.src.images.all ),
	templates: globals.getPath( globals.config.paths.src.templates.all )
}

function watch() {

	global.isWatching = true;

	globals.gulp.watch( paths.styles, globals.gulp.series('styles') );
	globals.gulp.watch( paths.images, globals.gulp.series('images') );
	globals.gulp.watch( paths.templates, globals.gulp.series('templates') );
};

globals.gulp.task('watch', watch);

module.exports = watch;
