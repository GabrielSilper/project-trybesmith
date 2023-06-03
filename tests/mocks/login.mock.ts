import { Login } from '../../src/types/Login';
import UserModel from '../../src/database/models/user.model';
import { User } from '../../src/types/User';
import { ServiceData } from '../../src/types/ServiceData';
import { OK, UNAUTHORIZED } from '../../src/constants/httpCodes';
import { Token } from '../../src/types/Token';

const oneWhateverLogin: Login = {
  username: 'O louco Meu!',
  password: 'Essa Fera aí bicho',
};

const theRealLogin: Login = {
  username: 'Eddie',
  password: 'sortudo',
};

const hashedPassword =
  '$2a$10$KVecoeyjdEaWygaAJqGavebGozpszG9wodLXjLQwhyzUnBNlknXsS';

const loginMock: User = {
  id: 1,
  username: 'Eddie',
  password: hashedPassword,
  level: 3,
  vocation: 'Mago',
};

const loginBuild = UserModel.build(loginMock);

const loginWrongResolve: ServiceData<string> = {
  type: 'UNAUTHORIZED',
  status: UNAUTHORIZED,
  message: 'Username or password invalid'
}

const loginCorrectResolve: ServiceData<Token> = {
  type: null,
  status: OK,
  message: { token: '256HS$#&DDD'}
}

const badLoginBody = {
  username: 'Gabriel'
}

export default {
  oneWhateverLogin,
  theRealLogin,
  loginBuild,
  loginWrongResolve,
  loginCorrectResolve,
  badLoginBody,
};
