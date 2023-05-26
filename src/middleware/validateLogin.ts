import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST } from '../constants/httpCodes';

export default function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void {
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(BAD_REQUEST)
      .json({ message: '"username" and "password" are required' });
  }
  return next();
}
