require('dotenv').config();
const { join } = require('path');
const express = require('express');
const compression = require('compression');
const paths = require('../../webpack/paths');

const app = express();
app.use(compression());

app.use(express.static(paths.buildClient));

app.get('/*', (req, res) => {
  res.sendFile(join(paths.buildClient, 'index.html'), function (err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
  console.log('listening on port ', server.address().port);
});
