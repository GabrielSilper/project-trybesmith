import { Request, Response } from 'express';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import validateToken from '../../../src/middleware/validateToken';
import { UNAUTHORIZED } from '../../../src/constants/httpCodes';
import jwtUtil from '../../../src/utils/jwt.util';

chai.use(sinonChai);

describe('ValidateToken Middleware', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = sinon.stub();

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Messagem de erro para caso o token não seja passado.', () => {
    req.headers = {
      authorization: undefined,
    };
    validateToken(req, res, next);
    expect(res.status).to.have.calledWith(UNAUTHORIZED);
  });

  it('Messagem de erro para caso o token seja inválido.', () => {
    req.headers = {
      authorization: 'undefined',
    };
    validateToken(req, res, next);
    expect(res.status).to.have.calledWith(UNAUTHORIZED);
  });

  it('Chama o próximo middleware com um token válido.', () => {
    req.headers = {
      authorization: '256HS#$@@#TR',
    };
    sinon.stub(jwtUtil, 'verify').returns({ id: 1, username: 'Gabriel' });
    validateToken(req, res, next);
    expect(next).to.have.calledOnce;
  });
});
