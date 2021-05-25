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
const paths = require('./paths');

const isProd = process.env.NODE_ENV === 'production';

console.log('paths.env', paths.env);

module.exports = [
  new WebpackBar({
    name: isProd ? 'Production' : 'Development',
    color: isProd ? 'blue' : 'orange',
  }),
  !isProd && new Dotenv({ path: paths.env }),
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
  new LoadablePlugin({ filename: 'stats.json', writeToDisk: true }),
  !isProd &&
    (new webpack.HotModuleReplacementPlugin(), new ReactRefreshWebpackPlugin()),
].filter(Boolean);
