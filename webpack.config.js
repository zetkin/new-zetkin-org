const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );

module.exports = {
	...defaultConfig,
	// Override the default entry config to add index
	entry() {
		return {
			...defaultConfig.entry(),
			editor: [
				'./src/scripts/editor',
				'./src/styles/editor/index.scss',
			],
			view: './src/scripts/view',
			style: './src/styles/style/index.scss',
		};
	},
	resolve: {
		alias: {
			'@zetkin': path.resolve( __dirname, 'src' ),
		},
	},
};
