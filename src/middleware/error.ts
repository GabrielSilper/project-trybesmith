import { NextFunction, Request, Response } from 'express';
import { INTERNAL_ERROR } from '../constants/httpCodes';

const error = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  res.status(INTERNAL_ERROR).json({
    message: 'Algo de errado aconteceu!',
    err,
  });
};

export default error;
