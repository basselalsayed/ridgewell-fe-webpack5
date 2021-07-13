const webpack = require('webpack');
const ESLintPlugin = require('eslint-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { merge } = require('webpack-merge');
const paths = require('./paths');
const common = require('./client.common');
require('dotenv/config');

module.exports = merge(common, {
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',

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
