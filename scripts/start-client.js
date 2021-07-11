require('dotenv').config();
const { join } = require('path');
const rimraf = require('rimraf');
const express = require('express');
const compression = require('compression');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const devConfig = require('../webpack/client.dev');
const paths = require('../webpack/paths');
const { logMessage, compilerPromise } = require('./utils');

const clientCompiler = webpack(devConfig);

const start = async () => {
  rimraf.sync(paths.buildClient);

  const app = express();
  app.use(compression());

  app.use(
    webpackDevMiddleware(clientCompiler, {
      writeToDisk: true,
    })
  );

  app.use(webpackHotMiddleware(clientCompiler));

  app.use('*', express.static(join(paths.buildClient, paths.public)));

  app.get('/*', (_, res) => {
    res.sendFile(join(paths.buildClient, paths.public, 'index.html'), (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
  });

  app.set('port', process.env.PORT || 8080);

  try {
    await compilerPromise('client', clientCompiler);

    const server = app.listen(app.get('port'), () => {
      logMessage(`listening on port ${server.address().port}`, 'info');
    });
  } catch (e) {
    console.log('e', e);
    logMessage('e', 'error');
  }
};

start();
