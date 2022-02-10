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

app.use('/', basicRouter);
app.use('/admin', adminRouter);


// app.use((req, res) => {
//     const title = `Halló ${req.url.length > 1 ? req.url.substring(1) : 'heimur'}!`
//     res.status(200).render('index', { title});
// });

app.use((req, res) => {
    const title = 'Síða fannst ekki';
    res.status(404).render('error', { title });
  });  

app.listen(port, () => {
    console.info(`Server running at http://localhost:${port}/`);
  });