var globals = require('../globals.js')

function w3cHTML(cb) {
	return globals.gulp.src(globals.config.paths.dist.templates.all)
		.pipe(
			globals.$.plumber({
				errorHandler: globals.consoleError
			})
		)
		.pipe( globals.$.w3cjs() )
		.pipe( globals.$.w3cjs.reporter() );
}

globals.gulp.task('w3c:html', w3cHTML);

module.exports = w3cHTML;
