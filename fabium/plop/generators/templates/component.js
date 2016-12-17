var isntEmpty = require('../../utils/isnt_empty')
var path = require('path')
var getPath = require( path.resolve(process.cwd(), 'fabium/utils/get_path.js') )

module.exports = function(config) {
	return {
		description: 'Create a new component',
		prompts: [
			{
				name: 'name',
				type: 'input',
				message: "Component's name",
				validate: isntEmpty
			}
		],
		actions: [
			{
				type: 'add',
				path: getPath( config.plop.templates.component.path )
			}
		]
	}
}
