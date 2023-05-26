import { Request, Response } from 'express';
import productService from '../services/product.service';

const create = async (req: Request, res: Response) => {
  const { status, message } = await productService.create(req.body);
  // if (type) return res.status(status).json({ message });
  return res.status(status).json(message);
};

const getAll = async (req: Request, res: Response) => {
  const { status, message } = await productService.getAll();
  return res.status(status).json(message);
};

export default {
  create,
  getAll,
};
