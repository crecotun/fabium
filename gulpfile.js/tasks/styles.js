var globals = require('../globals.js'),
		sugarss = require('sugarss')

var postcssPlugins = [
	require('postcss-inline-comment'),
	require('postcss-import'),
	require('precss'),
	require('postcss-inline-svg'),
	require('postcss-assets')({
		basePath: './assets/',
		loadPaths: ['images/', 'fonts/']
	}),
	require('postcss-svgo'),
	require('postcss-hexrgba'), // rucksack
	require('postcss-sass-color-functions'),
	require('postcss-short'),
	require('autoprefixer')({
		browsers: ['last 2 versions'],
		cascade: false
	})
];

function styles() {
	return globals.gulp.src( globals.config.paths.src.styles.main )
		.pipe(
			globals.$.plumber(function(error) {
				console.log( error.message )
				this.emit('end');
			})
		)
		.pipe( globals.$.postcss(postcssPlugins, { parser: sugarss } ) )
		.pipe(
			globals.$.rename(function(path){
				path.extname = '.css'
			})
		)
		.pipe( globals.gulp.dest( globals.config.paths.dist.styles.path ) );
};

globals.gulp.task('styles', styles);

module.exports = styles;
