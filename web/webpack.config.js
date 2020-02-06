/* global process */

const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
const backendBaseUrl = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3333';

const copyOptions = [{
  from: 'src/sw.js',
  to: '.',
}, {
  from: 'robots.txt',
  to: '.',
}, {
  from: 'index.html',
  to: '.',
}, {
  from: 'favicon.svg',
  to: '.',
}, {
  from: 'manifest.json',
  to: '.',
}, {
  from: 'images/',
  to: 'images/',
}];

const variableOptions = {
  '__BACKEND_URL__': JSON.stringify(backendBaseUrl),
};

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
    new CopyWebpackPlugin(copyOptions, { copyUnmodified: true }),
    new webpack.DefinePlugin(variableOptions)
  ],
};
