require('dotenv').config();
const { join } = require('path');
const express = require('express');

const compression = require('compression');
const paths = require('../../webpack/paths');
// const coldStart = require('../server/coldStart');

const app = express();
app.use(compression());
// app.use(coldStart);
console.log('process.env.PORT start', process.env.PORT);
app.use(express.static(join(paths.buildClient)));

app.get('/*', (_, res) => {
  res.sendFile(join(paths.buildClient, paths.public, 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
  console.log('listening on port ', server.address().port);
});
