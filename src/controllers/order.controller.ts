import { Request, Response } from 'express';
import orderService from '../services/order.service';

const getAll = async (req: Request, res: Response) => {
  const { status, message } = await orderService.getAll();
  return res.status(status).json(message);
};

const create = async (req: Request, res: Response) => {
  const { userId, productIds } = req.body;
  const { type, status, message } = await orderService.create(userId, productIds);
  if (type) return res.status(status).json({ message });
  return res.status(status).json(message);
};

export default {
  getAll,
  create,
};
