// ##################################################################################
// ##### Dependencies
// ##################################################################################

// gulp modules
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();

// # config.yml file
const config = require('./config');

// tasks
const styles = require('./tasks/styles');
const scripts = require('./tasks/scripts');
const images = require('./tasks/images');
const templates = require('./tasks/templates');
const watch = require('./tasks/watch');

// utils
const consoleError = require('./utils/console_error');

// ##################################################################################
// ##### Tasks
// ##################################################################################
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('images', images);
gulp.task('templates', templates)
gulp.task('watch', watch);


// ##################################################################################
// ##### Groups of tasks
// ##################################################################################

// Run all tasks
// gulp.task( 'default', gulp.series('bower', 'sprite', 'stylus', 'coffee', 'images', 'jade') );
gulp.task( 'default', gulp.parallel('images', 'styles', 'scripts', 'templates') );
gulp.task('dev', gulp.series('default', 'watch'))
