require('dotenv').config();
const { join } = require('path');
const express = require('express');
const compression = require('compression');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const devConfig = require('../webpack/webpack.dev');
const paths = require('../webpack/paths');
const { logMessage, compilerPromise } = require('./utils');

const clientCompiler = webpack(devConfig);

const start = async () => {
  const app = express();
  app.use(compression());
  app.use(webpackDevMiddleware(clientCompiler));

  app.use(webpackHotMiddleware(clientCompiler));

  app.use('*', express.static(paths.buildClient));

  app.get('/*', (req, res) => {
    res.sendFile(join(paths.buildClient, 'index.html'), function (err) {
      if (err) {
        res.status(500).send(err);
      }
    });
  });

  console.log('devConfig.output.publicPath', devConfig.output.publicPath);

  app.set('port', process.env.PORT || 8080);

  try {
    // await compilerPromise('client', clientCompiler);

    const server = app.listen(app.get('port'), () => {
      logMessage(`listening on port ${server.address().port}`, 'info');
    });
  } catch (e) {
    console.log('e', e);
    logMessage('e', 'error');
  }
};

start();
