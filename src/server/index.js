require('dotenv').config();

import { join } from 'path';
import express from 'express';

import compression from 'compression';
import cors from 'cors';
import paths from '../../webpack/paths';
import serverRenderer from './serverRenderer';
import coldStart from './coldStart';
import addStore from './addStore';

const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { argv } = yargs(hideBin(process.argv));

const app = express();

console.log('process.env.PORT start', process.env.PORT);
console.log('argv.port start', argv.port);

app.use(coldStart);
app.use(compression());
app.use(cors());
app.use(addStore);
app.use(paths.public, express.static(join(paths.buildClient, paths.public)));

app.use(serverRenderer);

app.set('port', argv.port || process.env.PORT || 8080);

const server = app.listen(app.get('port'), '0.0.0.0', () => {
  console.log('listening on port ', server.address().port);
});
