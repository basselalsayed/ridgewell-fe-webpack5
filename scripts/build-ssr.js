require('dotenv').config();
const rimraf = require('rimraf');
const webpack = require('webpack');
const paths = require('../webpack/paths');
const clientConfig = require('../webpack/client.prod');
const serverConfig = require('../webpack/server.prod');

const { logMessage, compilerPromise } = require('./utils');

console.log('process.env build', process.env);

const build = async () => {
  rimraf.sync(paths.buildClient);
  rimraf.sync(paths.buildServer);
  const {
    compilers: [clientCompiler, serverCompiler],
  } = webpack([clientConfig, serverConfig]);

  try {
    clientCompiler.run((error, stats) => {
      if (!error && !stats.hasErrors()) {
        console.log(stats.toString(clientConfig.stats));
        return;
      }
      logMessage((stats.compilation.errors, 'error'));

      clientCompiler.close((closeErr) => {
        logMessage((closeErr, 'error'));
      });
    });

    serverCompiler.run((error, stats) => {
      if (!error && !stats.hasErrors()) {
        console.log(stats.toString(clientConfig.stats));
        return;
      }
      logMessage((stats.compilation.errors, 'error'));

      serverCompiler.close((closeErr) => {
        logMessage(closeErr, 'error');
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
