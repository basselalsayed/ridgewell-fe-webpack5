require('dotenv').config();
const webpack = require('webpack');
const rimraf = require('rimraf');
const paths = require('../webpack/paths');
const clientConfig = require('../webpack/client.prod');

const { logMessage, compilerPromise, webpackErrorHandler } = require('./utils');

const build = async () => {
  rimraf.sync(paths.buildClient);

  const clientCompiler = webpack(clientConfig);

  clientCompiler.run((error, stats) => {
    webpackErrorHandler(error, stats);

    clientCompiler.close((closeErr) => {
      if (closeErr) {
        console.log('closeErr', closeErr);
        logMessage(closeErr, 'error');
      }
    });
  });

  try {
    // wait until client is compiled
    await compilerPromise('client', clientCompiler);
    logMessage('Done!', 'info');
  } catch (error) {
    console.log('error', error);
    logMessage(error, 'error');
  }
};

build();
