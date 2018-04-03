var globals = require('../globals.js'),
		stylelint = require('stylelint')

var postcssPlugins = [
	require('postcss-inline-svg'),
	require('postcss-assets')({
		basePath: './assets/',
		loadPaths: ['images/', 'fonts/']
	}),
	require('postcss-svgo'),
	require('postcss-short'),
	require('postcss-custom-media'),
	require('postcss-media-minmax'),
	require('postcss-flexbugs-fixes'),
	require('autoprefixer')({
		browsers: ['last 2 versions'],
		cascade: false
	}),
	require("postcss-reporter")({ clearMessages: true })
];

var src = globals.getPath( globals.config.paths.src.styles.main ),
		dest = globals.getPath( globals.config.paths.dist.styles.path )

function styles() {
	return globals.gulp.src( src )
		.pipe(
			globals.$.plumber(function(error) {
				console.log( error.message )
				this.emit('end');
			})
		)
		.pipe(
			globals.$.sass({
				outputStyle: 'expanded'
			})
		)
		.pipe( globals.$.postcss(postcssPlugins) )
		.pipe(
			globals.$.rename(function(path){
				path.extname = '.css'
			})
		)
		.pipe( globals.gulp.dest( dest ) );
};

globals.gulp.task('styles', styles);

module.exports = styles;
