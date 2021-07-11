require('@babel/register')({
  // envName: 'tooling',
  // We can't add `extentions` directly to the Babel config because it's no known property for
  // env specific configs and results in an "Unknown option" error.
  extensions: ['.js', '.jsx'],
});

module.exports = require('./serverBase').default;
