var config = require('./gulpfile.js/config.json')

module.exports = function (plop) {

	plop.setGenerator('styles:component', {
		description: 'Component\'s name',
		prompts: [
			{
				type: 'input',
				name: 'name',
				message: 'Component\'s name',
				validate: function (value) {
						if ((/.+/).test(value)) { return true; }
						return 'name is required';
				}
			},
			{
				type: 'list',
				name: 'responsive',
				message: "Do you want to create a responsive file for this component?",
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
	});

	plop.setGenerator('styles:mixin', {

	})

};

// styles:component
// styles:component:responsive
// styles:mixin
// styles:common
//
// templates:component
// templates:layout
// templates:page
// templates:partials
