var config = require('../gulpfile.js/config.json')

module.exports = function (plop) {

	plop.setGenerator('styles:component', require('./generators/styles/component.js')(config));

	plop.setGenerator('styles:mixin', require('./generators/styles/mixin.js')(config))

};

// styles:mixin
// styles:common
//
// templates:component
// templates:layout
// templates:page
// templates:partials
