require('@babel/register')({
  extensions: ['.js', '.jsx'],
});
const webpack = require('webpack');
const path = require('path');
const { join } = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const Dotenv = require('dotenv-webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const LoadablePlugin = require('@loadable/webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const paths = require('./paths');
const WaitPlugin = require('./plugins/WaitPlugin');
const { clientOnly, noStream } = require('../scripts/utils');

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const shared = [
  isProd
    ? new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.PORT': JSON.stringify(process.env.PORT),
        'process.env.API_URL': JSON.stringify(process.env.API_URL),
        'process.env.MY_IV': JSON.stringify(process.env.MY_IV),
        'process.env.MY_SECRET_KEY': JSON.stringify(process.env.MY_SECRET_KEY),
      })
    : new Dotenv({ path: paths.env }),
  new MiniCssExtractPlugin({
    filename: !isProd ? '[name].css' : '[name].[contenthash].css',
    chunkFilename: !isProd ? '[id].css' : '[id].[chunkhash].css',
  }),
  new webpack.DefinePlugin({
    __DISABLE_SSR__: JSON.stringify(clientOnly()),
    __NO_STREAM__: JSON.stringify(noStream()),
  }),
  !isProd && new webpack.HotModuleReplacementPlugin(),
  // new WorkboxPlugin.GenerateSW(),
].filter(Boolean);

const server = [
  new WebpackBar({
    name: `Server - ${isProd ? 'Production' : 'Development'}`,
    color: isProd ? 'orange' : 'blue',
  }),
  new WaitPlugin(
    join(paths.buildClient, paths.public, 'client-stats.json'),
    10,
    90000
  ),
  ...shared,
  new webpack.DefinePlugin({
    __CLIENT__: JSON.stringify(false),
    __SERVER__: JSON.stringify(true),
  }),
];

const client = [
  new WebpackBar({
    name: `Client - ${isProd ? 'Production' : 'Development'}`,
    color: isProd ? 'blue' : 'orange',
  }),
  ...shared,
  new webpack.DefinePlugin({
    __CLIENT__: JSON.stringify(true),
    __SERVER__: JSON.stringify(false),
  }),
  new webpack.ProvidePlugin({
    process: 'process/browser',
    Buffer: ['buffer', 'Buffer'],
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, '../public'),
        to: 'assets',
        globOptions: {
          ignore: ['*.DS_Store'],
        },
      },
    ],
  }),
  clientOnly() &&
    new HtmlWebpackPlugin({
      title: 'Ridgewell House',
      // favicon: paths.src + '/images/favicon.png',
      template: `${paths.src}/template.html`,
      filename: 'index.html',
    }),
  new WorkboxPlugin.GenerateSW(),

  new LodashModuleReplacementPlugin(),
  !isProd &&
    new ReactRefreshWebpackPlugin({
      overlay: {
        sockIntegration: 'whm',
      },
    }),
  new LoadablePlugin({ filename: 'client-stats.json', writeToDisk: true }),
  // new BundleAnalyzerPlugin(),
].filter(Boolean);

module.exports = { client, server };
