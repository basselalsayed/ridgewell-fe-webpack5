const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const Dotenv = require('dotenv-webpack');
const paths = require('./paths');
const WorkboxPlugin = require('workbox-webpack-plugin');

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
  plugins: [
    new WebpackBar(),
    new Dotenv({ path: paths.env, safe: true }),
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
  ],
  resolve: {
    modules: [paths.src, 'node_modules'],
    fallback: {
      stream: 'stream-browserify',
    },
  },
  module: {
    rules: [
      // javascript
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // images
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      // Fonts and SVGs
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: 'asset/inline',
      },
    ],
  },
  optimization: {
    // runtimeChunk: 'single',
    // splitChunks: {
    //   chunks: 'all',
    // },
  },
};
