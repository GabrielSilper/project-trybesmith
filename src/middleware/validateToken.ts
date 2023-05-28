import { NextFunction, Request, Response } from 'express';
import { UNAUTHORIZED } from '../constants/httpCodes';
import jwtUtil from '../utils/jwt.util';

const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(UNAUTHORIZED).json({
      message: 'Token not found',
    });
  }
  try {
    jwtUtil.verify(authorization);
  } catch (error) {
    return res.status(UNAUTHORIZED).json({
      message: 'Invalid token',
    });
  }
  return next();
};

export default validateToken;
