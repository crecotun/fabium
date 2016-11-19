var isntEmpty = require('../../utils/isnt_empty')

module.exports = function(config) {
	var mixinsReplace = "/*---------- Append Here ----------*/"
	return {
		description: 'Create a new mixin',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Mixin\'s name',
				validate: isntEmpty
			}
		],
		actions: [
			{
				type: 'add',
				path: config.plop.styles.mixin.path,
				templateFile: config.plop.styles.mixin.template
			},
			{
				type: 'modify',
				path: 'src/assets/styles/mixins/index.sss',
				pattern: mixinsReplace,
				template:
					'@import "./{{snakeCase name}}.sss"\n'+
					mixinsReplace
			}
		]
	}
}
