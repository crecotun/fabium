var
	gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),

	config = require('../../config'),
	consoleError = require('../../utils/console_error'),
	sshConfig = require('./ssh.json');

function clean() {
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

	return gulp.src(config.paths.archives.dist)
		.pipe(
			gulpSSH.dest( sshConfig.server_paths.project.path )
		);
}

function unzip() {
	var gulpSSH = new $.ssh({
		sshConfig: sshConfig.options
	});

	return gulpSSH.exec([
		'cd ' + sshConfig.server_paths.project.path + ' && unzip project_dist.zip -d . && rm project_dist.zip'
	]);
}

module.exports = {
	clean: clean,
	upload: upload,
	unzip: unzip
};
