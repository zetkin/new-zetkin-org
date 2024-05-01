const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	// Override the default entry config to add index
	entry() {
		return {
			...defaultConfig.entry(),
			index: [ './src/js/index.js', './src/sass/index.scss' ],
		};
	},
};
