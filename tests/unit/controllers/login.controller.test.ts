import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import loginMock from '../../mocks/login.mock';
import loginService from '../../../src/services/login.service';
import loginController from '../../../src/controllers/login.controller';
import { OK, UNAUTHORIZED } from '../../../src/constants/httpCodes';

chai.use(sinonChai);

describe('LoginController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  describe('Verificando a função signIn', () => {
    it('Caso de login errado, se retorna as informações para caso de falha.', async () => {
      req.body = loginMock.oneWhateverLogin;

      sinon.stub(loginService, 'signIn').resolves(loginMock.loginWrongResolve);

      await loginController.signIn(req, res);

      expect(res.status).to.have.calledWith(UNAUTHORIZED);
      expect(res.json).to.have.calledWith({
        message: loginMock.loginWrongResolve.message,
      });
    });
    it('Caso de login certo, se retorna as informações para caso de sucesso.', async () => {
      req.body = loginMock.theRealLogin;

      sinon
        .stub(loginService, 'signIn')
        .resolves(loginMock.loginCorrectResolve);

      await loginController.signIn(req, res);

      expect(res.status).to.have.calledWith(OK);
      expect(res.json).to.have.calledWith(
        loginMock.loginCorrectResolve.message
      );
    });
  });
});
