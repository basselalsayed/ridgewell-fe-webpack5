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
const { logMessage, compilerPromise } = require('./utils');

const PORT =
  process.env.PORT ||
  (!Number.isNaN(Number(process.env.PORT))
    ? Number(process.env.PORT) + 1
    : 8080);

const watchOptions = {
  ignored: /node_modules/,
  stats: clientConfig.stats,
};

const start = async () => {
  rimraf.sync(paths.buildClient);
  rimraf.sync(paths.buildServer);
  const app = express();
  app.use(compression());
  app.use(cors());

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

  app.listen(PORT);

  serverCompiler.watch(watchOptions, (error, stats) => {
    if (!error && !stats.hasErrors()) {
      console.log(stats.toString(serverConfig.stats));
      return;
    }

    if (error) {
      logMessage(error, 'error');
    }

    if (stats.hasErrors()) {
      const info = stats.toJson();
      const errors = info.errors[0].split('\n');
      // logMessage(errors, 'error');
    }
  });

  try {
    await compilerPromise('client', clientCompiler);
    await compilerPromise('server', serverCompiler);
  } catch (error) {
    logMessage(error, 'error');
  }

  const script = nodemon({
    script: `${paths.buildServer}/server.js`,
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
