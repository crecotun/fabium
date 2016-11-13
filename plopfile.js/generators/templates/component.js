var isntEmpty = require('../../utils/isnt_empty')

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
				path: config.plop.templates.component.path
			}
		]
	}
}
