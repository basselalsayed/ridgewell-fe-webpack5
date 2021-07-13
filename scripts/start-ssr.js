require('dotenv').config();
const rimraf = require('rimraf');
const express = require('express');
const compression = require('compression');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const cors = require('cors');
const nodemon = require('nodemon');
const clientConfig = require('../webpack/client.dev');
const serverConfig = require('../webpack/server.dev');
const paths = require('../webpack/paths');
const { logMessage, compilerPromise, webpackErrorHandler } = require('./utils');

const WEBPACK_PORT =
  process.env.PORT ||
  (!Number.isNaN(Number(process.env.PORT))
    ? Number(process.env.PORT) + 1
    : 8081);

const DEVSERVER_HOST = process.env.DEVSERVER_HOST || '0.0.0.0';

const devPublicPath = [`${DEVSERVER_HOST}:${WEBPACK_PORT}`, paths.public]
  .join('/')
  .replace(/([^:+])\/+/g, '$1/');

const watchOptions = {
  ignored: /node_modules/,
  stats: clientConfig.stats,
};

const app = express();
app.use(compression());
app.use(cors());

const start = async () => {
  rimraf.sync(paths.buildClient);
  rimraf.sync(paths.buildServer);

  clientConfig.entry.bundle = [
    `webpack-hot-middleware/client?path=${DEVSERVER_HOST}:${WEBPACK_PORT}/__webpack_hmr`,
    ...clientConfig.entry.bundle,
  ];

  clientConfig.output.hotUpdateMainFilename =
    'updates/[fullhash].hot-update.json';
  clientConfig.output.hotUpdateChunkFilename =
    'updates/[id].[fullhash].hot-update.js';

  clientConfig.output.publicPath = devPublicPath;
  serverConfig.output.publicPath = devPublicPath;

  const {
    compilers: [clientCompiler, serverCompiler],
  } = webpack([clientConfig, serverConfig]);

  app.use(
    webpackDevMiddleware(clientCompiler, {
      writeToDisk: true,
    })
  );

  app.use(webpackHotMiddleware(clientCompiler));

  app.use(paths.public, express.static(paths.buildClient));

  app.listen(WEBPACK_PORT);

  serverCompiler.watch(watchOptions, webpackErrorHandler);

  try {
    await compilerPromise('client', clientCompiler);
    await compilerPromise('server', serverCompiler);
  } catch (error) {
    logMessage(error, 'error');
  }

  const script = nodemon({
    script: `${paths.buildServer}/main.server.js`,
    ignore: ['src', 'scripts', 'webpack', './*.*', 'dist/client', '**/tmp'],
    delay: 200,
  });

  script.on('restart', () => {
    logMessage('Server side app has been restarted.', 'warning');
  });

  script.on('quit', () => {
    console.log('Process ended');
    process.exit();
  });

  script.on('error', () => {
    logMessage('An error occured. Exiting', 'error');
    process.exit(1);
  });
};

start();
