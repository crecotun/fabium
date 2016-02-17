// ##################################################################################
// ##### Dependencies
// ##################################################################################

// gulp modules
var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	// # config.yml file
	config = require('./config'),

	// tasks
	styles = require('./tasks/styles'),
	scripts = require('./tasks/scripts'),
	images = require('./tasks/images'),
	templates = require('./tasks/templates'),
	sprites = require('./tasks/sprites/sprites'),
	autoprefixer = require('./tasks/autoprefixer'),
	watch = require('./tasks/watch'),

	// utils
	consoleError = require('./utils/console_error');

// ##################################################################################
// ##### Tasks
// ##################################################################################
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('images', images);
gulp.task('templates', templates);
gulp.task('sprites', sprites);
gulp.task('autoprefixer', autoprefixer);

gulp.task('watch', watch);


// ##################################################################################
// ##### Groups of tasks
// ##################################################################################

// Run all tasks
// gulp.task( 'default', gulp.series('bower', 'sprite', 'stylus', 'coffee', 'images', 'jade') );
gulp.task('default',
	gulp.series(
		gulp.parallel('images', 'styles', 'scripts', 'templates', 'sprites'),
		gulp.series('autoprefixer')
	)
);

gulp.task('dev',
	gulp.series('default', 'watch')
);
