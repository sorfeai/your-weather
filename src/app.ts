require('dotenv').config();

import path from 'path';
import express, { Application } from 'express';
import { AddressInfo } from 'net';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import methodOverride from 'method-override';
import errorhandler from 'errorhandler';

import routes from './routes/index';

const isProd = process.env.NODE_ENV === 'production';

const PORT = Number(isProd ? process.env.PORT : process.env.DEVELOPMENT_PORT)
  || 8080;

const app: Application = express();

app.use(cors());

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(__dirname + '/public'));

if (!isProd) {
  app.use(errorhandler());
}

app.use(routes);

if (isProd) {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

app.use((req, res, next) => {
  var err = new Error('Not Found');
  (err as any).status = 404;
  next(err);
});

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${(server.address() as AddressInfo).port}`);
});