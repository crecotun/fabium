var isntEmpty = require('../../utils/isnt_empty')

module.exports = function(config) {
	return {
		description: 'Create a new component\'s style file',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Component\'s name',
				validate: isntEmpty
			},
			{
				type: 'list',
				name: 'responsive',
				message: "Responsive file?",
				default: true,
				choices: [
					{name: "Yes", value: true},
					{name: "No", value: false}
				]
			}
		],
		actions: function(data) {
			var componentsReplace = "//----------  Components: End  ----------//"

			var actions = [
				{
					type: 'add',
					path: config.plop.styles.component.paths.default,
					templateFile: config.plop.styles.component.templates.default
				}
			]

			if (data.responsive) {
				actions = actions.concat([
					{
						type: 'add',
						path: config.plop.styles.component.paths.responsive,
						templateFile: config.plop.styles.component.templates.responsive
					}
				])
			}

			actions = actions.concat([
				{
					type: 'modify',
					path: 'src/assets/styles/main.sss',
					pattern: componentsReplace,
					template:
						'// {{snakeCase name}}\n'+
						'@import "components/{{snakeCase name}}/{{snakeCase name}}.sss"\n'+
						(data.responsive ? '@import "components/{{snakeCase name}}/{{snakeCase name}}-responsive.sss"\n' : '')+
						'\n'+
						componentsReplace
				}
			])

			return actions

		}
	}
}
