path = require('path')

module.exports = function(passedPath) {
	return path.resolve( process.cwd(), passedPath )
}
