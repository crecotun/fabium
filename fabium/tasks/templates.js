const { gulp } = require('../globals.js')
var globals = require('../globals.js')
const through2 = require('through2')

const src = globals.config.paths.src.templates.pages.all
const dest = globals.getPath(globals.config.paths.dist.path)

var emitty = require('@emitty/core').configure({
	cwd: globals.config.paths.src.templates.path,
})

const state = {
	// Changed files are written by the name of the task that will process them.
	// This is necessary to support more than one language in @emitty.
	watch: {
		templates: undefined,
	},
}

function getFilter(taskName) {
	return through2.obj(function (file, _encoding, callback) {
		emitty.filter(file.path, state.watch[taskName]).then(result => {
			if (result) {
				this.push(file)
			}

			callback()
		})
	})
}

emitty.language({
	extensions: ['.pug'],
	parser: require('@emitty/language-pug').parse,
})

function templates() {
	return gulp
		.src(src)
		.pipe(globals.$.if(global.isWatching, getFilter('templates')))
		.pipe(
			globals.$.pug({
				pretty: true,
			}),
		)
		.pipe(globals.gulp.dest(dest))
}

globals.gulp.task('templates', templates)

module.exports = templates
