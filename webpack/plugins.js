const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
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

const isProd = process.env.NODE_ENV === 'production';

if (isProd) {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}

const shared = [
  new WebpackBar({
    name: isProd ? 'Production' : 'Development',
    color: isProd ? 'blue' : 'orange',
  }),
  isProd
    ? new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'process.env.PORT': JSON.stringify(process.env.PORT),
        'process.env.API_URL': JSON.stringify(process.env.API_URL),
        'process.env.MY_IV': JSON.stringify(process.env.MY_IV),
        'process.env.MY_SECRET_KEY': JSON.stringify(process.env.MY_SECRET_KEY),
      })
    : new Dotenv({ path: paths.env }),
  new LoadablePlugin({ filename: 'stats.json', writeToDisk: true }),
];

// not implemented yet
// eslint-disable-next-line no-unused-vars
const server = [
  ...shared,
  new webpack.DefinePlugin({
    __CLIENT__: JSON.stringify(false),
    __SERVER__: JSON.stringify(true),
  }),
];

module.exports = [
  ...shared,
  new webpack.DefinePlugin({
    __CLIENT__: JSON.stringify(true),
  }),
  new webpack.ProvidePlugin({
    process: 'process/browser',
    Buffer: ['buffer', 'Buffer'],
  }),
  new CleanWebpackPlugin(),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: paths.public,
        to: 'assets',
        globOptions: {
          ignore: ['*.DS_Store'],
        },
      },
    ],
  }),
  new HtmlWebpackPlugin({
    title: 'Ridgewell House',
    // favicon: paths.src + '/images/favicon.png',
    template: `${paths.src}/template.html`,
    filename: 'index.html',
  }),
  new WorkboxPlugin.GenerateSW(),
  // isProd &&
  //   new MiniCssExtractPlugin({
  //     filename: 'styles/[name].[contenthash].css',
  //     chunkFilename: '[id].css',
  //   }),
  new MiniCssExtractPlugin({
    filename: !isProd ? '[name].css' : '[name].[contenthash].css',
    chunkFilename: !isProd ? '[id].css' : '[id].[chunkhash].css',
  }),
  new LodashModuleReplacementPlugin(),
  ...(!isProd
    ? [
        new webpack.HotModuleReplacementPlugin(),
        new ReactRefreshWebpackPlugin(),
      ]
    : []),
  // new BundleAnalyzerPlugin(),
].filter(Boolean);
