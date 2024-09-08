const path = require("path");

module.exports = {
	// Set the title of the style guide
	title: "My React Style Guide",

	// Specify the components to include in the style guide
	components: "src/components/**/[A-Z]*.tsx",

	// Specify the example mode (collapse or expand)
	exampleMode: "collapse",

	// Specify the usage mode (collapse or expand)
	usageMode: "expand",

	// Specify the webpack config file
	webpackConfig: require("./webpack.config.js"),

	// Specify global styles to be included in the style guide
	require: [
		path.join(__dirname, "src/styles/global.css"),
		"bootstrap/dist/css/bootstrap.min.css"
	],

	// Specify the template to use for the style guide
	template: {
		head: {
			links: [
				{
					rel: "stylesheet",
					href: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
				}
			]
		}
	},

	// Customize the style guide theme
	theme: {
		color: {
			link: "cornflowerblue",
			linkHover: "darkblue"
		},
		fontFamily: {
			base: '"Helvetica Neue", Helvetica, Arial, sans-serif'
		}
	},

	// Customize the style guide styles
	styles: {
		Playground: {
			preview: {
				padding: "20px",
				border: "1px solid #ddd"
			}
		}
	}
};
