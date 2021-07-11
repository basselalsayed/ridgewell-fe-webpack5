const { merge } = require('webpack-merge');
const common = require('./server.common');

module.exports = merge(common, {
  mode: 'production',
  // optimization: {
  //   minimize: true,
  // },
});
