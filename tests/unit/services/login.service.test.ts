import { expect } from 'chai';
import sinon from 'sinon';
import UserModel from '../../../src/database/models/user.model';
import loginService from '../../../src/services/login.service';
import loginMock from '../../mocks/login.mock';
import { OK, UNAUTHORIZED } from '../../../src/constants/httpCodes';
import bcrypt from 'bcryptjs';
import jwtUtil from '../../../src/utils/jwt.util';

describe('LoginService', function () {
  beforeEach(function () {
    sinon.restore();
  });

  describe('Verificando a função signIn', () => {
    it('Caso não exista o usuário no banco de dados.', async () => {
      sinon.stub(UserModel, 'findOne').resolves(null);

      const serviceResult = await loginService.signIn(
        loginMock.oneWhateverLogin
      );

      expect(serviceResult.type).to.be.equal('UNAUTHORIZED');
      expect(serviceResult.status).to.be.equal(UNAUTHORIZED);
      expect(serviceResult.message).to.be.equal('Username or password invalid');
    });

    it('Caso exista o usuário, porém senha não é igual do banco de dados.', async () => {
      sinon.stub(UserModel, 'findOne').resolves(loginMock.loginBuild);
      sinon.stub(bcrypt, 'compareSync').returns(false);

      const serviceResult = await loginService.signIn(
        loginMock.oneWhateverLogin
      );

      expect(serviceResult.type).to.be.equal('UNAUTHORIZED');
      expect(serviceResult.status).to.be.equal(UNAUTHORIZED);
      expect(serviceResult.message).to.be.equal('Username or password invalid');
    });

    it('Caso de login de sucesso.', async () => {
      sinon.stub(UserModel, 'findOne').resolves(loginMock.loginBuild);
      sinon.stub(bcrypt, 'compareSync').returns(true); // Fiz o mock devido a tempo de execução
      sinon.stub(jwtUtil, 'sign').returns('256HSDF#$$');

      const serviceResult = await loginService.signIn(loginMock.theRealLogin);
      expect(serviceResult.type).to.be.null;
      expect(serviceResult.status).to.be.equal(OK);
      expect(serviceResult.message).to.deep.equal({ token: '256HSDF#$$' });
    });
  });
});
