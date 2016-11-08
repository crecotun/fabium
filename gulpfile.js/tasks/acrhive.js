var globals = require('../globals.js')

function zipSrc() {
	return globals.gulp.src([globals.config.paths.src.all])
		.pipe( globals.$.zip('project_src.zip') )
		.pipe(
			globals.gulp.dest( globals.config.paths.archives.path )
		);
}

function zipDist() {
	return globals.gulp.src([globals.config.paths.dist.all])
		.pipe( globals.$.zip('project_dist.zip') )
		.pipe(
			globals.gulp.dest( globals.config.paths.archives.path )
		);
}

globals.gulp.task('archive:src', zipSrc);
globals.gulp.task('archive:dist', zipDist);
globals.gulp.task('archive', globals.gulp.series('archive:src', 'archive:dist'));

module.exports = {
	zipSrc: zipSrc,
	zipDist: zipDist
}
