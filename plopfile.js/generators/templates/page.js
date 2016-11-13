var isntEmpty = require('../../utils/isnt_empty')

module.exports = function(config) {
	var pageReplace = "//- Append Pages Here"

	return {
		description: 'Create a new page',
		prompts: [
			{
				name: 'name',
				type: 'input',
				message: "Page's name",
				validate: isntEmpty
			}
		],
		actions: [
			{
				type: 'add',
				path: config.plop.templates.page.path
			},
			{
				type: 'modify',
				pattern: pageReplace,
				path: './src/templates/pages/index.pug',
				template:
					"li: a(href='./{{snakeCase name}}.html') {{titleCase name}}\n"+
					"\t\t\t\t"+
					pageReplace
			}
		]
	}
}
