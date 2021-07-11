require('dotenv').config();
const webpack = require('webpack');
const rimraf = require('rimraf');
const paths = require('../webpack/paths');
const clientConfig = require('../webpack/client.prod');

const { logMessage, compilerPromise } = require('./utils');

const build = async () => {
  rimraf.sync(paths.buildClient);

  const clientCompiler = webpack(clientConfig);

  clientCompiler.run((error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(clientConfig.stats));
      return;
    }
    logMessage((stats.compilation.errors, 'error'));

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
