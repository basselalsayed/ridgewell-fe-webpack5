require('dotenv').config();
const rimraf = require('rimraf');
const webpack = require('webpack');
const paths = require('../webpack/paths');
const clientConfig = require('../webpack/client.prod');
const serverConfig = require('../webpack/server.prod');

const { logMessage, compilerPromise, webpackErrorHandler } = require('./utils');

const build = async () => {
  rimraf.sync(paths.buildClient);
  rimraf.sync(paths.buildServer);
  const {
    compilers: [clientCompiler, serverCompiler],
  } = webpack([clientConfig, serverConfig]);

  try {
    clientCompiler.run((error, stats) => {
      webpackErrorHandler(error, stats);
      clientCompiler.close((closeErr) => {
        if (closeErr) logMessage((closeErr, 'error'));
      });
    });

    serverCompiler.run((error, stats) => {
      webpackErrorHandler(error, stats);

      serverCompiler.close((closeErr) => {
        if (closeErr) logMessage(closeErr, 'error');
      });
    });

    await compilerPromise('client', serverConfig);
    await compilerPromise('server', serverConfig);
    logMessage('Done!', 'info');
  } catch (error) {
    logMessage(error, 'error');
  }
};

build();
