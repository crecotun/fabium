var path = require('path');
var fs = require('fs');

module.exports = function (directoryPath) {
	const filesList = fs.readdirSync(directoryPath)

	return filesList.filter(function(file) {
		return file.indexOf('.js') > -1
	})
}
