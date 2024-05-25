module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:react/recommended', // if you're using React
		'plugin:@wordpress/eslint-plugin/recommended', // if you're using WordPress
		'plugin:prettier/recommended',
	],
	plugins: [ 'prettier' ],
	rules: {
		'prettier/prettier': 'error',
		// Add any custom rules here
	},
};
