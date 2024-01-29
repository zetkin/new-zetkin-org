const path = require('path');

module.exports = {
  entry: './zetkin-theme/_src/blocks.js', // Path to your main JavaScript file
  output: {
    path: path.resolve(__dirname, './zetkin-theme/blocks'), // Output directory
    filename: 'blocks.js' // Output file
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};
