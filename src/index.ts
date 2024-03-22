import express from 'express';
import { AuthRouter } from './routes/AuthRouter';
import { ProductRouter } from './routes/ProductRouter';
import { APP_PORT, APP_URL } from './constants';
import { checkAuth } from './middlewares/AuthJWT';

const app = express();

app.use(express.json());
app.use(checkAuth);
app.use(AuthRouter);
app.use(ProductRouter);

// eslint-disable-next-line no-console
app.listen(APP_PORT, () => console.log(`Running on: ${APP_URL}:${APP_PORT}`));
