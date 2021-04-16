const path = require('path');

module.exports = {
  buildClient: path.resolve(__dirname, '../dist'),
  env: path.resolve(__filename, '..', '..', '.env'),
  client: path.resolve(__dirname, '..', 'src', 'client'),
  public: path.resolve(__dirname, '../public'),
  root: path.resolve(__dirname, '..'),
  server: path.resolve(__dirname, '..', 'src', 'server'),
  src: path.resolve(__dirname, '..', 'src'),
};
