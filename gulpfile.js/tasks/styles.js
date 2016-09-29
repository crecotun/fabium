var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	autoprefixer = require('autoprefixer'),

	config = require('../config'),
	consoleError = require('../utils/console_error'),

	sugarss = require('sugarss'),
	precss = require('precss'),
	atImport = require('postcss-import'),
	hexRgba = require('postcss-hexrgba'),
	inlineSVG = require('postcss-inline-svg'),
	inlineComment = require('postcss-inline-comment'),
	sugarss = require('sugarss'),
	postcssSVGO = require('postcss-svgo'),
	shortCSS = require('postcss-short'),
	sassColor = require('postcss-sass-color-functions');

function styles() {
	return gulp.src( config.paths.src.styles.main )
		.pipe(
			$.plumber({
				errorHandler: consoleError
			})
		)
		.pipe( $.postcss([
			inlineComment,
			atImport,
			precss,
			inlineSVG,
			postcssSVGO,
			hexRgba,
			sassColor,
			shortCSS,
			autoprefixer({
				browsers: ['last 2 versions'],
				cascade: false
			})
		], { parser: sugarss } ) )
		.pipe(
			$.rename(function(path){
				path.extname = '.css'
			})
		)
		.pipe( gulp.dest( config.paths.dist.styles.path ) );
};

module.exports = styles;
