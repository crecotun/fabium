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
	stylesMin = require('./tasks/styles_min'),
	scripts = require('./tasks/scripts'),
	scriptsMin = require('./tasks/scripts_min'),
	images = require('./tasks/images'),
	imagesMin = require('./tasks/images_min'),
	templates = require('./tasks/templates'),
	sprites = require('./tasks/sprites/sprites'),
	autoprefixer = require('./tasks/autoprefixer'),
	watch = require('./tasks/watch'),
	bower = require('./tasks/bower'),
	browsersync = require('./tasks/browsersync'),

	// utils
	consoleError = require('./utils/console_error');

// ##################################################################################
// ##### Tasks
// ##################################################################################
gulp.task('styles', styles);
gulp.task('styles:min', stylesMin);

gulp.task('scripts', scripts);
gulp.task('scripts:min', scriptsMin);

gulp.task('images', images);
gulp.task('images:min', imagesMin)

gulp.task('templates', templates);

gulp.task('sprites', sprites);

gulp.task('bower', bower);

gulp.task('autoprefixer', autoprefixer);

gulp.task('watch', watch);

gulp.task('browsersync', browsersync);

// ##################################################################################
// ##### Groups of tasks
// ##################################################################################

// Run all tasks
gulp.task('default',
	gulp.series(
		gulp.parallel('bower', 'images', 'styles', 'scripts', 'templates', 'sprites'),
		gulp.series('autoprefixer')
	)
);

gulp.task('dev',
	gulp.parallel(
		gulp.series('default', 'browsersync'),
		'watch'
	)
);

gulp.task('minify',
	gulp.series('images:min', 'styles:min', 'scripts:min')
);

gulp.task('production',
	gulp.series('default', 'minify')
);
