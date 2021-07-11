const path = require('path');
const paths = require('./paths');

const { client: loaders } = require('./loaders');
const { client: plugins } = require('./plugins');

module.exports = {
  // entry: {
  //   // page: [`${paths.src}/index.js`, `${paths.src}/components/home/home.js`],
  //   index: `${paths.src}/index.js`,
  // },
  entry: `${paths.client}`,
  target: 'web',
  // entry: {
  //   index: {
  //     import: `${paths.src}/index.js`,
  //     dependOn: 'shared',
  //   },
  //   calendar: {
  //     import: `${paths.src}/components/home/home.js`,
  //     dependOn: 'shared',
  //   },
  //   shared: ['react', 'react-bootstrap'],
  // },
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
