const path = require('path');
const paths = require('./paths');

const { server: plugins } = require('./plugins');
const resolve = require('./resolve');
const { server: loaders } = require('./loaders');

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
    filename: '[name].server.js',
    publicPath: path.join(paths.buildClient, paths.public),
  },
  plugins,
  resolve,
  module: {
    rules: loaders,
  },
};
