const path = require('path');
const paths = require('./paths');

const { client: loaders } = require('./loaders');
const { client: plugins } = require('./plugins');

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
  resolve: {
    modules: [paths.src, 'node_modules'],
    fallback: {
      stream: 'stream-browserify',
    },
    alias: {
      components: path.join(paths.src, 'components'),
    },
  },
  module: {
    rules: loaders,
  },
};
