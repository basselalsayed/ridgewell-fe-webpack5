import 'dotenv/config';
import { join } from 'path';
import express from 'express';

import compression from 'compression';
import paths, { buildClient } from '../../webpack/paths';
import coldStart from '../server/coldStart';

const app = express();
app.use(compression());
app.use(coldStart);

app.use(express.static(join(buildClient)));

app.get('/*', (_, res) => {
  res.sendFile(join(buildClient, paths.public, 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
  console.log('listening on port ', server.address().port);
});
