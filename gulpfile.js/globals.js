var gulp = require('gulp'),
		config = require('./config.json'),
		consoleError = require('./utils/console_error'),
		$ = require('gulp-load-plugins')()

var sugarss = require('sugarss'),
		precss = require('precss'),
		atImport = require('postcss-import'),
		hexRgba = require('postcss-hexrgba'),
		inlineSVG = require('postcss-inline-svg'),
		inlineComment = require('postcss-inline-comment'),
		sugarss = require('sugarss'),
		postcssSVGO = require('postcss-svgo'),
		shortCSS = require('postcss-short'),
		sassColor = require('postcss-sass-color-functions'),
		autoprefixer = require('autoprefixer')

var postcssProcessors = [
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
];

module.exports = {
	gulp: gulp,
	postcssProcessors: postcssProcessors,
	config: config,
	consoleError: consoleError,
	sugarss: sugarss,
	$: $
}
