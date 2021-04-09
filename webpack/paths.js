const path = require('path');

module.exports = {
  env: path.resolve(__filename, '..', '..', '.env'),
  src: path.resolve(__dirname, '..', 'src'),
  client: path.resolve(__dirname, '..', 'src', 'client'),
  server: path.resolve(__dirname, '..', 'src', 'server'),
  buildClient: path.resolve(__dirname, '../dist'),
  public: path.resolve(__dirname, '../public'),
};
