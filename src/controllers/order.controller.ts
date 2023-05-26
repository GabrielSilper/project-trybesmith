import { Request, Response } from 'express';
import orderService from '../services/order.service';

const getAll = async (req: Request, res: Response) => {
  const { status, message } = await orderService.getAll();
  return res.status(status).json(message);
};

export default {
  getAll,
};
