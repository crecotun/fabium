// ##################################################################################
// ##### Dependencies
// ##################################################################################

// node modules
import fs from 'fs'
import yaml from 'js-yaml'
import pngcrush from 'imagemin-pngcrush'

// gulp modules
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins'
const g = gulpLoadPlugins()

// # config.yml file
const config = yaml.load( fs.readFileSync("config.yml", "utf8") )


// ##################################################################################
// ##### Helpers
// ##################################################################################

// # Play sound if gulp got an error
function consoleErorr(err) {
	g.util.beep()
	console.log( err.message )
}


// ##################################################################################
// ##### Tasks
// ##################################################################################

gulp.task('bower', () => {
	g.bower( config.paths.built.libs )
});


// # Sprite generation
gulp.task('sprite', () => {
	var spriteData = gulp.src( config.paths.src.sprites.images.all )
		.pipe( g.plumber({
			errorHandler: consoleErorr
		}) )
		.pipe( g.spritesmith({
			imgName: 'sprite.png',
			cssName: 'sprite.styl',
			padding: 2,
			cssFormat: 'stylus',
			algorithm: 'binary-tree',
			cssTemplate: 'stylus.template.mustache',
			cssVarMap: (sprite) => {
				sprite.name = 's-' + sprite.name
			}
		}) );

	spriteData.img.pipe( gulp.dest(config.paths.built.images.design.path) ); // # sprite image dest
	spriteData.css.pipe( gulp.dest(config.paths.src.sprites.style) ); // # css dest

});

// # coffee to js
gulp.task('coffee', () => {
	gulp.src( config.paths.src.scripts.all )
		.pipe( g.plumber({
			errorHandler: consoleErorr
		}) )
		.pipe( g.coffee({
			bare: true
		}) )
		.pipe( gulp.dest( config.paths.built.scripts.path ) );
});

// # stylus to css
gulp.task( 'stylus', () => {
	gulp.src( config.paths.src.styles.main )
		.pipe( g.plumber({
			errorHandler: consoleErorr
		}) )
		.pipe( g.stylus() )
		.pipe( gulp.dest( config.paths.built.styles.path ) );
});

// # move images from src to built
gulp.task( 'images', () => {
	gulp.src( [config.paths.src.images.all, '!'+config.paths.src.sprites.images.all] )
		.pipe( gulp.dest( config.paths.built.images.path ) );
});

// # jade to html
// # compile just 1 level of `pages` folder
gulp.task( 'jade', () => {
	gulp.src( config.paths.src.templates.pages.all )
		.pipe( g.plumber({
			errorHandler: consoleErorr
		}) )
		.pipe( g.jade({
			pretty: true
		}) )
		.pipe( gulp.dest( config.paths.built.path ) );
});

// # add vendor prefixes
gulp.task( 'autoprefixer', () => {
	gulp.src( config.paths.built.styles.all )
		.pipe( g.autoprefixer() )
		.pipe( gulp.dest( config.paths.built.styles.path ) );
});


// ##################################################################################
// ##### Optimization
// ##################################################################################

// # minify js
gulp.task( 'scripts:min', () => {
	gulp.src( config.paths.built.scripts.all )
		.pipe( g.plumber({
			errorHandler: consoleErorr
		}) )
		.pipe( g.uglify() )
		.pipe( gulp.dest( config.paths.built.scripts.path ) );
});

// # minify images
gulp.task( 'images:min', () => {
	gulp.src( config.paths.built.images.all )
		.pipe( g.plumber({
			errorHandler: consoleErorr
		}) )
		.pipe( g.imagemin({
			progressive: true,
			svgoPlugins: [
				{
					removeViewBox: false
				}
			],
			use: [
				pngcrush()
			],
		}) )
		.pipe( gulp.dest( config.paths.built.images.path ) );
});

// minify css
gulp.task( 'styles:min', () => {
	gulp.src( config.paths.built.styles.all )
		.pipe( g.plumber({
			errorHandler: consoleErorr
		}) )
		.pipe( g.minifyCss() )
		.pipe( gulp.dest( config.paths.built.styles.path ) );
});


// Watch for changes
gulp.task( 'watch', () => {
	gulp.watch( config.paths.src.scripts.all, ['coffee'] );
	gulp.watch( config.paths.src.styles.all, ['stylus'] );
	gulp.watch( config.paths.src.images.all, ['images'] );
	gulp.watch( config.paths.src.sprites.images.all, ['sprite'] );
	gulp.watch( config.paths.src.templates.all, ['jade'] );
});


// ##################################################################################
// ##### Groups of tasks
// ##################################################################################

// Run all tasks
gulp.task( 'default', ['bower', 'sprite', 'stylus', 'coffee', 'images', 'jade'] );

// Run all tasks and start watching for changes
gulp.task( 'dev', ['default', 'watch'] );

// minify js, css and images
gulp.task( 'minify', ['scripts:min', 'styles:min', 'images:min'] );

// Prepare project for production. Run all tasks and minify assets
gulp.task( 'prod', ['default', 'autoprefixer'], () => {
	gulp.start('minify');
});
