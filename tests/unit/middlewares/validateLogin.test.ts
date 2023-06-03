import { Request, Response } from 'express';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import validateLogin from '../../../src/middleware/validateLogin';
import {
  BAD_REQUEST,
} from '../../../src/constants/httpCodes';
import loginMock from '../../mocks/login.mock';

chai.use(sinonChai);

describe('ValidateLogin Middleware', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = sinon.stub();

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Messagem de erro para uma chave necessária no body.', () => {
    req.body = loginMock.badLoginBody;

    validateLogin(req, res, next);

    expect(res.status).to.have.calledWith(BAD_REQUEST);
  });

  it('Chama o próximo middleware com um body correto.', () => {
    req.body = loginMock.theRealLogin;

    validateLogin(req, res, next);

    expect(next).to.have.calledOnce;
  });
});
