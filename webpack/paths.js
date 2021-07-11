const path = require('path');

module.exports = {
  buildClient: path.resolve(__dirname, '..', 'dist', 'client'),
  buildServer: path.resolve(__dirname, '..', 'dist', 'server'),
  env: path.resolve(__dirname, '..', '.env'),
  client: path.resolve(__dirname, '..', 'src', 'client'),
  public: '/static/',
  root: path.resolve(__dirname, '..'),
  server: path.resolve(__dirname, '..', 'src', 'server'),
  src: path.resolve(__dirname, '..', 'src'),
};
