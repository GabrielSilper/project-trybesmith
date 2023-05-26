import jwt from 'jsonwebtoken';
import { TokenPayload } from 'src/types/TokenPayload';

const secret = process.env.JWT_SECRET || 'secret';

const sign = (payload: TokenPayload): string => jwt.sign(payload, secret);

const verify = (token: string): TokenPayload => jwt.verify(token, secret) as TokenPayload;

export default {
  sign,
  verify,
};
