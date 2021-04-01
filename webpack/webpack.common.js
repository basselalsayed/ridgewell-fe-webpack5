const paths = require('./paths');

const loaders = require('./loaders');
const plugins = require('./plugins');

module.exports = {
  entry: {
    // page: [`${paths.src}/index.js`, `${paths.src}/components/home/home.js`],
    index: `${paths.src}/index.js`,
  },
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
    path: paths.build,
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    publicPath: '/',
  },
  plugins,
  resolve: {
    modules: [paths.src, 'node_modules'],
    fallback: {
      stream: 'stream-browserify',
    },
  },
  module: {
    rules: loaders,
  },
};
