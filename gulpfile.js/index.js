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
	w3cHTML = require('./tasks/w3c_html'),

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
gulp.task('archive', gulp.series('archive:src', 'archive:dist'));

gulp.task('ssh:clean', ssh.clean);
gulp.task('ssh:upload', ssh.upload);
gulp.task('ssh:unzip', ssh.unzip);
gulp.task('ssh', gulp.series('ssh:clean', 'ssh:upload', 'ssh:unzip'));

gulp.task('w3c:html', w3cHTML);

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
	gulp.series('default', 'styles:rtl', 'minify')
);

gulp.task('deploy',
	gulp.series('production', 'archive', 'ssh')
);

gulp.task('validate',
	gulp.series('w3c:html')
);
