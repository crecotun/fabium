// ##################################################################################
// ##### Dependencies
// ##################################################################################

// node modules
const pngcrush = require('imagemin-pngcrush');

// gulp modules
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

// # config.yml file
const config = require('./config');

const consoleError = require('./tasks/console_error');
const styles = require('./tasks/styles');
const scripts = require('./tasks/scripts');


// ##################################################################################
// ##### Helpers
// ##################################################################################


// ##################################################################################
// ##### Tasks
// ##################################################################################
gulp.task('styles', styles);
gulp.task('scripts', scripts);


// ##################################################################################
// ##### Groups of tasks
// ##################################################################################

// Run all tasks
// gulp.task( 'default', gulp.series('bower', 'sprite', 'stylus', 'coffee', 'images', 'jade') );
gulp.task( 'default', gulp.series('styles', 'scripts') );
