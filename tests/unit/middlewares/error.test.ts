import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import error from '../../../src/middleware/error';
import { Request, Response } from 'express';
import { INTERNAL_ERROR } from '../../../src/constants/httpCodes';

chai.use(sinonChai);

describe('Error Middleware', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = sinon.stub();
  const err = new Error('Teste de erro');

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Se trata o Erro que é lançado e manda uma resposta com o erro.', () => {
    error(err, req, res, next);

    expect(res.status).to.have.calledWith(INTERNAL_ERROR);
  });
});
