/* global process */

const CopyWebpackPlugin = require('copy-webpack-plugin');

function getDevTool() {
  if (process.env.NODE_ENV !== 'production') {
    return 'source-map';
  }

  return false;
}

module.exports = {
  entry: {
    main: './src/main.jsx',
  },
  output: {
    filename: './[name].js',
  },
  devtool: getDevTool(),
  module: {
    rules: [{
      test: /\.js|\.jsx$/,
      exclude: /node_modules/,
      enforce: 'pre',
      loader: 'eslint-loader'
    }, {
      test: /\.js|\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
  plugins: [
    new CopyWebpackPlugin([{
        from: 'robots.txt',
        to: '.',
      }, {
        from: 'index.html',
        to: '.',
      }], { copyUnmodified: true })
    ],
};
