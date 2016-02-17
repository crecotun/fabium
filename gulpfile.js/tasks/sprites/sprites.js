var
	pngcrush = require('imagemin-pngcrush'),
	merge = require('merge-stream'),
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../../config'),
	consoleError = require('../../utils/console_error');

function sprites() {

	var spriteData = gulp.src( config.paths.src.sprites.images.all )
		.pipe(
			$.plumber({
				errorHandler: consoleError
			})
		)
		.pipe(
			$.spritesmith({
				imgName: 'sprite.png',
				cssName: 'sprite.styl',
				padding: 2,
				cssFormat: 'stylus',
				algorithm: 'binary-tree',
				cssVarMap: function (sprite) {
					sprite.name = 's-' + sprite.name
				},
				cssTemplate: __dirname + '/sprite.stylus.handlebars',
		}) );

	var imgStream = spriteData.img
		.pipe( gulp.dest(config.paths.built.images.path) );

	var cssStream = spriteData.css
		.pipe( gulp.dest(config.paths.src.sprites.style) );

	return merge(imgStream, cssStream);

};

module.exports = sprites;
