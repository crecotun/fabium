var $ = require('gulp-load-plugins')()

// # Play sound if gulp got an error
module.exports = function(err) {
	globals.$.util.beep()
	console.log( err.message )
}
