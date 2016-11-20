var globals = require('../globals.js')

var zipSrc_src = globals.getPath( globals.config.paths.src.all ),
		zipSrc_dest = globals.getPath( globals.config.paths.archives.path ),
		zipDist_src = globals.getPath( globals.config.paths.dist.all ),
		zipDist_dest = globals.getPath( globals.config.paths.archives.path )

function zipSrc() {
	return globals.gulp.src( zipSrc_src )
		.pipe( globals.$.zip('project_src.zip') )
		.pipe(
			globals.gulp.dest( zipSrc_dest )
		);
}

function zipDist() {
	return globals.gulp.src( zipDist_src )
		.pipe( globals.$.zip('project_dist.zip') )
		.pipe(
			globals.gulp.dest( zipDist_dest )
		);
}

globals.gulp.task('archive:src', zipSrc);
globals.gulp.task('archive:dist', zipDist);
globals.gulp.task('archive', globals.gulp.series('archive:src', 'archive:dist'));

module.exports = {
	zipSrc: zipSrc,
	zipDist: zipDist
}
