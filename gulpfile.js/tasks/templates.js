var globals = require('../globals.js')

var src = globals.getPath( globals.config.paths.src.templates.all ),
		dest = globals.getPath( globals.config.paths.dist.path )

function templates() {
	return globals.gulp.src( src, {since: globals.gulp.lastRun('templates')} )
		.pipe(
			globals.$.if(
				global.isWatching,
				globals.$.pugInheritance({
					basedir: 'src/templates',
					extension: '.pug',
					skip: 'node_modules'
				})
			)
		)
		.pipe(
			globals.$.filter(
				function(file) {
					return /[\\\/]pages/.test(file.path);
				}
			)
		)
		.pipe(
			globals.$.pug({
				pretty: true
			})
		)
		.pipe( globals.$.rename({dirname: '.'}) )
		.pipe( globals.gulp.dest( dest ) );
};

globals.gulp.task('templates', templates);

module.exports = templates;
