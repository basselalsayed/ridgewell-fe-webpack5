const path = require('path');
const paths = require('./paths');

const { client: plugins } = require('./plugins');
const resolve = require('./resolve');
const { client: loaders } = require('./loaders');

module.exports = {
  // entry: { bundle: [paths.client] },
  target: 'web',
  entry: {
    bundle: [paths.client],
  },
  output: {
    path: path.join(paths.buildClient, paths.public),
    filename: '[name].bundle.js',
    chunkFilename: '[name].[contenthash].chunk.js',
    publicPath: paths.public,
  },
  plugins,
  resolve,
  module: {
    rules: loaders,
  },
};
