import { NextFunction, Request, Response } from 'express';
import schemas from '../utils/schemas.util';
import { BAD_REQUEST, UNPPROCESSABLE_ENTITY } from '../constants/httpCodes';

export default function validateProduct(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  const { error } = schemas.productSchema.validate(req.body);
  if (error) {
    const { type, message } = error.details[0];

    const badOrUnpprocessable = type.includes('required');

    if (badOrUnpprocessable) {
      return res.status(BAD_REQUEST).json({ message });
    }

    return res.status(UNPPROCESSABLE_ENTITY).json({ message });
  }
  next();
}
