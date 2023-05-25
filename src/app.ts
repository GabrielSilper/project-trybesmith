import express, { Request, Response } from 'express';
import productRouter from './routers/product.router';
import { OK } from './constants/httpCodes';

const app = express();

app.use(express.json());
app.use('/products', productRouter);
app.get('/', (req: Request, res: Response) => {
  res.status(OK).send('App is live.');
});

export default app;
