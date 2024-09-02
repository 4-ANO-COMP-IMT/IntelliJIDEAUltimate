const path = require("path");

module.exports = {
	root: true,
	env: { browser: true, es2021: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended-type-checked",
		"plugin:react-hooks/recommended",
		"plugin:prettier/recommended"
	],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: path.join(__dirname, "./tsconfig.json")
	},
	overrides: [
		{
			extends: ["plugin:@typescript-eslint/disable-type-checked"],
			files: ["./*/.js"]
		}
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react", "@typescript-eslint", "react-refresh"],
	rules: {
		"@typescript-eslint/no-unsafe-member-access": "warn",
		"@typescript-eslint/no-unsafe-assignment": "warn",
		"@typescript-eslint/no-unsafe-call": "warn",
		"@typescript-eslint/no-misused-promises": "warn",
		"@typescript-eslint/no-unsafe-return": "warn",
		"@typescript-eslint/no-floating-promises": "warn",
		"@typescript-eslint/no-explicit-any": "warn",
		"@typescript-eslint/no-unsafe-argument": "warn",
		"@typescript-eslint/no-unsafe-enum-comparison": "warn",
		"@typescript-eslint/no-unused-vars": "warn",
		"@typescript-eslint/no-var-requires": "warn",
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true }
		]
	}
};
