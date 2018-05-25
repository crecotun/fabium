var path = require('path');
const getFilesList = require('./getFilesList')

module.exports = function (directoryPath) {
	const filesList = getFilesList(directoryPath)

	return filesList.reduce(function (result, current) {
		const fileNameWithoutExtension = current.replace('.js', '')

		return {
			...result,
			[fileNameWithoutExtension]: [
				'babel-polyfill',
				`${directoryPath}/${current}`
			]
		}
	}, {})
}
