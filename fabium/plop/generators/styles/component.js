var isntEmpty = require('../../utils/isnt_empty')
var path = require('path')
var getPath = require( path.resolve(process.env.PWD, 'fabium/utils/get_path.js') )

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
			var componentsReplace = "/*----------  Components: End  ----------*/"

			var actions = [
				{
					type: 'add',
					path: getPath( config.plop.styles.component.paths.default ),
					templateFile: getPath( config.plop.styles.component.templates.default )
				}
			]

			if (data.responsive) {
				actions = actions.concat([
					{
						type: 'add',
						path: getPath( config.plop.styles.component.paths.responsive ),
						templateFile: getPath( config.plop.styles.component.templates.responsive )
					}
				])
			}

			actions = actions.concat([
				{
					type: 'modify',
					path: getPath( config.paths.src.styles.main ),
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
