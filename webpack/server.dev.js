const webpack = require('webpack');
const { merge } = require('webpack-merge');
const paths = require('./paths');
const common = require('./server.common');
require('dotenv/config');

const PORT =
  process.env.PORT ||
  (!Number.isNaN(Number(process.env.PORT))
    ? Number(process.env.PORT) + 1
    : 8080);

const DEVSERVER_HOST = process.env.DEVSERVER_HOST || '0.0.0.0';

const publicPath = [`${DEVSERVER_HOST}:${PORT}`, paths.public]
  .join('/')
  .replace(/([^:+])\/+/g, '$1/');

console.log('publicPath', publicPath);

module.exports = merge(common, {
  mode: 'development',
  performance: {
    hints: false,
  },

  devtool: 'inline-source-map',

  output: {
    publicPath: [`${DEVSERVER_HOST}:${PORT}`, paths.public]
      .join('/')
      .replace(/([^:+])\/+/g, '$1/'),
  },
});
