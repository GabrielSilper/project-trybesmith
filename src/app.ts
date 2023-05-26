import express, { Request, Response } from 'express';
import { OK } from './constants/httpCodes';
import productRouter from './routers/product.router';
import orderRouter from './routers/order.router';
import loginRouter from './routers/login.router';

const app = express();

app.use(express.json());
app.use('/products', productRouter);
app.use('/orders', orderRouter);
app.use('/login', loginRouter);

app.get('/', (req: Request, res: Response) => {
  res.status(OK).send('App is live.');
});

export default app;
