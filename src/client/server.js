require('@babel/register')({
  extensions: ['.js', '.jsx'],
});

module.exports = require('./serverBase').default;
