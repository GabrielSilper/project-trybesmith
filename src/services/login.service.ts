import bcrypt from 'bcryptjs';
import jwtUtil from '../utils/jwt.util';
import { OK, UNAUTHORIZED } from '../constants/httpCodes';
import UserModel from '../database/models/user.model';
import { Login } from '../types/Login';
import { ServiceData } from '../types/ServiceData';
import { Token } from '../types/Token';

const signIn = async (login: Login): Promise<ServiceData<Token | string>> => {
  const user = await UserModel.findOne({ where: { username: login.username } });
  if (!user || !bcrypt.compareSync(login.password, user.dataValues.password)) {
    return {
      type: 'UNAUTHORIZED',
      status: UNAUTHORIZED,
      message: 'Username or password invalid',
    };
  }

  const { id, username } = user.dataValues;
  const token = jwtUtil.sign({ id, username });

  return { type: null, status: OK, message: { token } };
};

export default {
  signIn,
};
