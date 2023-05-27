import { NextFunction, Request, Response } from 'express';
import schemas from '../utils/schemas.util';

export default async function validateProduct(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  await schemas.productSchema.validateAsync(req.body);

  next();
}
