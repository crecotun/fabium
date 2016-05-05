var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../../config'),
	consoleError = require('../../utils/console_error'),
	sshConfig = require('./ssh.json');

function clearRemote() {
	var gulpSSH = new $.ssh({
		sshConfig: sshConfig.options
	});

	return gulpSSH
					.exec([
						'cd ' + sshConfig.server_paths.project.path + ' && rm -rf *'
					]);
}

function upload() {
	var gulpSSH = new $.ssh({
		sshConfig: sshConfig.options
	});
	return gulp.src(config.paths.built.all)
					.pipe(
						gulpSSH.dest( sshConfig.server_paths.project.path )
					);
}

module.exports = {
	clearRemote: clearRemote,
	upload: upload
};
