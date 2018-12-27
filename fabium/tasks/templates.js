var globals = require('../globals.js')

var src = globals.config.paths.src.templates.pages.all,
		dest = globals.getPath(globals.config.paths.dist.path)

var emitty = require('emitty').setup(
	globals.config.paths.src.templates.path,
	'pug'
)

function templates() {
	return new Promise((resolve, reject) => {
		emitty.scan(global.emittyChangedFile).then(() => {
			return globals.gulp
				.src(src)
				.pipe(
					globals.$.if(
						global.isWatching,
						emitty.filter(global.emittyChangedFile)
					)
				)
				.pipe(
					globals.$.pug({
						pretty: true,
					})
				)
				.pipe(globals.gulp.dest(dest))
				.on('end', resolve)
				.on('error', reject)
		})
	})
}

globals.gulp.task('templates', templates)

module.exports = templates
