module.exports = function(value) {
	return value.trim().length ? true : 'Field is required'
}
