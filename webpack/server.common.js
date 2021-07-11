const path = require('path');
const paths = require('./paths');

const { server: loaders } = require('./loaders');
const { server: plugins } = require('./plugins');

module.exports = {
  entry: paths.server,
  target: 'node',
  node: {
    global: false,
    __filename: true,
    __dirname: true,
  },
  output: {
    path: paths.buildServer,
    filename: 'server.js',
    publicPath: path.join(paths.buildClient, paths.public),
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
