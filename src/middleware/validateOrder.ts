import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST, UNPPROCESSABLE_ENTITY } from '../constants/httpCodes';
import schemasUtil from '../utils/schemas.util';

export default function validateOrder(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  const { error } = schemasUtil.orderSchema.validate(req.body);
  if (error) {
    const { type, message } = error.details[0];

    if (type.includes('required')) {
      return res.status(BAD_REQUEST).json({ message });
    }

    if (message.includes('at least')) {
      return res
        .status(UNPPROCESSABLE_ENTITY)
        .json({ message: '"productIds" must include only numbers' });
    }

    return res.status(UNPPROCESSABLE_ENTITY).json({ message });
  }
  next();
}
