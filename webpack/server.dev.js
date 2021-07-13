const { merge } = require('webpack-merge');
const common = require('./server.common');
require('dotenv').config();

module.exports = merge(common, {
  mode: 'development',
  performance: {
    hints: false,
  },
  devtool: 'inline-source-map',
});
