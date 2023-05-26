import { Request, Response } from 'express';
import loginService from 'src/services/login.service';

const signIn = async (req: Request, res: Response) => {
  const { type, status, message } = await loginService.signIn(req.body);
  if (type) return res.status(status).json({ message });
  return res.status(status).json(message);
};

export default { signIn };
