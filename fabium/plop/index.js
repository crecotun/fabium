var config = require('../config.json')

module.exports = function (plop) {

	plop.setGenerator('styles:component', require('./generators/styles/component.js')(config));
	plop.setGenerator('templates:component', require('./generators/templates/component.js')(config))
	plop.setGenerator('templates:page', require('./generators/templates/page.js')(config))
	plop.setGenerator('styles:mixin', require('./generators/styles/mixin.js')(config))


};
