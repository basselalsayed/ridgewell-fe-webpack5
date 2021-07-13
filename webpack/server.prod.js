const { merge } = require('webpack-merge');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const common = require('./server.common');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), '...'],
  },
});
