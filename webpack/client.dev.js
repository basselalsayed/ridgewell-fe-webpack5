const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');
const paths = require('./paths');
const common = require('./client.common');
require('dotenv/config');

const PORT =
  process.env.PORT ||
  (!Number.isNaN(Number(process.env.PORT))
    ? Number(process.env.PORT) + 1
    : 8080);

const DEVSERVER_HOST = process.env.DEVSERVER_HOST || 'http://localhost';

const publicPath = [`${DEVSERVER_HOST}:${PORT}`, paths.public]
  .join('/')
  .replace(/([^:+])\/+/g, '$1/');

console.log('publicPath', publicPath);

module.exports = merge(common, {
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',
  entry: {
    bundle: [
      `webpack-hot-middleware/client?path=${DEVSERVER_HOST}:${PORT}/__webpack_hmr`,
      paths.client,
    ],
  },

  output: {
    publicPath: [`${DEVSERVER_HOST}:${PORT}`, paths.public]
      .join('/')
      .replace(/([^:+])\/+/g, '$1/'),
    hotUpdateMainFilename: 'updates/[fullhash].hot-update.json',
    hotUpdateChunkFilename: 'updates/[id].[fullhash].hot-update.js',
  },
  // Spin up a server for quick development
  // devServer: {
  //   historyApiFallback: true,
  //   contentBase: paths.build,
  //   open: true,
  //   compress: true,
  //   hot: true,
  //   port: 8080,
  //   hotOnly: true,
  // },
  stats: false,
  // stats: {
  //   cached: false,
  //   cachedAssets: false,
  //   chunks: false,
  //   chunkModules: false,
  //   children: false,
  //   colors: true,
  //   hash: false,
  //   modules: false,
  //   reasons: false,
  //   timings: true,
  //   version: false,
  // },
});
