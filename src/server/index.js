// import 'dotenv/config';
import { join } from 'path';
import express from 'express';

import compression from 'compression';
import cors from 'cors';
import paths from '../../webpack/paths';
import serverRenderer from './serverRenderer';
import coldStart from './coldStart';
import addStore from './addStore';

const app = express();

console.log('process.env.PORT start', process.env.PORT);

app.use(coldStart);
app.use(compression());
app.use(cors());
app.use(addStore);
app.use(paths.public, express.static(join(paths.buildClient, paths.public)));

app.use(serverRenderer);
app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
  console.log('listening on port ', server.address().port);
});
