const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const paths = require('./paths');

module.exports = {
  entry: `${paths.src}/index.js`,
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  plugins: [
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
  ],
  resolve: {
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
};
