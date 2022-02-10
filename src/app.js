import express from 'express';
import { dirname,join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv'

import { router as basicRouter } from './routes/basic-routes.js';
import { router as adminRouter} from './routes/admin-routes.js';

dotenv.config();

const { PORT: port = 6969 } = process.env;
const app = express();

app.use(express.urlencoded({ extended: true }));

const path = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(path, '../public')));
app.set('views', join(path, '../views'));
app.set('view engine', 'ejs');

app.use('/admin', adminRouter);
app.use('/', basicRouter);


/**
 * Middleware sem sér um 404 villur.
 *
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @param {function} next Næsta middleware
 */
// eslint-disable-next-line no-unused-vars
function notFoundHandler(req, res, next) {
  const title = 'Síða fannst ekki';
  res.status(404).render('error', { title });
}

/**
 * Middleware sem sér um villumeðhöndlun.
 *
 * @param {object} err Villa sem kom upp
 * @param {object} req Request hlutur
 * @param {object} res Response hlutur
 * @param {function} next Næsta middleware
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  console.error(err);
  const title = 'Villa kom upp';
  res.status(500).render('error', { title });
}

app.use(notFoundHandler);
// app.use(errorHandler); 

app.listen(port, () => {
    console.info(`Server running at http://localhost:${port}/`);
  });