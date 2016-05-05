// ##################################################################################
// ##### Dependencies
// ##################################################################################

// gulp modules
var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	// # config.json file
	config = require('./config'),

	// tasks
	styles = require('./tasks/styles'),
	stylesMin = require('./tasks/styles_min'),
	stylesRTL = require('./tasks/styles_rtl')
	scripts = require('./tasks/scripts'),
	scriptsMin = require('./tasks/scripts_min'),
	images = require('./tasks/images'),
	imagesMin = require('./tasks/images_min'),
	templates = require('./tasks/templates'),
	sprites = require('./tasks/sprites/sprites'),
	watch = require('./tasks/watch'),
	bower = require('./tasks/bower'),
	browsersync = require('./tasks/browsersync'),
	zip = require('./tasks/zip'),
	ssh = require('./tasks/ssh/ssh'),

	// utils
	consoleError = require('./utils/console_error');

// ##################################################################################
// ##### Tasks
// ##################################################################################
gulp.task('styles', styles);
gulp.task('styles:min', stylesMin);
gulp.task('styles:rtl', stylesRTL);

gulp.task('scripts', scripts);
gulp.task('scripts:min', scriptsMin);

gulp.task('images', images);
gulp.task('images:min', imagesMin)

gulp.task('templates', templates);

gulp.task('sprites', sprites);

gulp.task('bower', bower);

gulp.task('watch', watch);

gulp.task('browsersync', browsersync);

gulp.task('archive:src', zip.zipSrc);
gulp.task('archive:dist', zip.zipDist);

gulp.task('ssh:clear_remote', ssh.clearRemote);
gulp.task('ssh:upload', ssh.upload);

// ##################################################################################
// ##### Groups of tasks
// ##################################################################################

// Run all tasks
gulp.task('default',
	gulp.series('bower', 'images', 'styles', 'scripts', 'templates', 'sprites')
);

gulp.task('dev',
	gulp.series('default', 'browsersync', 'watch')
);

gulp.task('minify',
	gulp.series('images:min', 'styles:min', 'scripts:min')
);

gulp.task('production',
	gulp.series('default', 'minify')
);

gulp.task('deploy',
	gulp.series('ssh:clear_remote', 'ssh:upload')
);
