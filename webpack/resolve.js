const path = require('path');
const paths = require('./paths');

module.exports = {
  modules: [paths.src, 'node_modules'],
  fallback: {
    stream: 'stream-browserify',
  },
  alias: {
    components: path.join(paths.src, 'components'),
  },
};
