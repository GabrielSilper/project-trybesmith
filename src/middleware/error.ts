import { NextFunction, Request, Response } from 'express';

const error = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  res.status(500).json({
    message: 'Algo de errado aconteceu!',
    err,
  });
};

export default error;
