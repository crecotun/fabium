var isntEmpty = require('../../utils/isnt_empty')
var path = require('path')
var getPath = require( path.resolve(process.env.PWD, 'fabium/utils/get_path.js') )

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
				path: getPath( config.plop.templates.page.path )
			},
			{
				type: 'modify',
				pattern: pageReplace,
				path: getPath( config.paths.src.templates.pages.index ),
				template:
					"li: a(href='./{{snakeCase name}}.html') {{titleCase name}}\n"+
					"\t\t\t\t"+
					pageReplace
			}
		]
	}
}
