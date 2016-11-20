var globals = require('../../globals.js'),
		sshConfig = require('./ssh.json');

function clean() {
	var gulpSSH = new globals.$.ssh({
		sshConfig: ssh.config.options
	});

	return gulpSSH
		.exec([
			'cd ' + ssh.config.server_paths.project.path + ' && rm -rf *'
		]);
}

function upload() {
	var gulpSSH = new globals.$.ssh({
		sshConfig: ssh.config.options
	});

	var src = globals.getPath( globals.config.paths.archives.dist )

	return globals.gulp.src( src )
		.pipe(
			gulpSSH.dest( ssh.config.server_paths.project.path )
		);
}

function unzip() {
	var gulpSSH = new globals.$.ssh({
		sshConfig: ssh.config.options
	});

	return gulpSSH.exec([
		'cd ' + ssh.config.server_paths.project.path + ' && unzip project_dist.zip -d . && rm project_dist.zip'
	]);
}

globals.gulp.task('ssh:clean', clean);
globals.gulp.task('ssh:upload', upload);
globals.gulp.task('ssh:unzip', unzip);
globals.gulp.task('ssh', globals.gulp.series('ssh:clean', 'ssh:upload', 'ssh:unzip'));

module.exports = {
	clean: clean,
	upload: upload,
	unzip: unzip
};
