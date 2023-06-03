import { Request, Response } from 'express';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import productMock from '../../mocks/product.mock';
import validateProduct from '../../../src/middleware/validateProduct';
import { BAD_REQUEST, UNPPROCESSABLE_ENTITY } from '../../../src/constants/httpCodes';

chai.use(sinonChai);

describe('ValidateProduct Middleware', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = sinon.stub();

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Messagem de erro para uma chave necessária no body.', () => {
    req.body = productMock.bodyWithoutAKey;

    validateProduct(req, res, next);

    expect(res.status).to.have.calledWith(BAD_REQUEST);
  });

  it('Messagem de erro para uma chave sem tamanho mínimo ou tipo errado no body.', () => {
    req.body = productMock.bodyUnpprocessable;

    validateProduct(req, res, next);

    expect(res.status).to.have.calledWith(UNPPROCESSABLE_ENTITY);
  });

  it('Messagem de erro para uma chave sem tamanho mínimo ou tipo errado no body.', () => {
    req.body = productMock.bodyUnpprocessable2;

    validateProduct(req, res, next);

    expect(res.status).to.have.calledWith(UNPPROCESSABLE_ENTITY);
  });

  it('Chama o próximo middleware com um body correto.', () => {
    req.body = productMock.correctBody;

    validateProduct(req, res, next);

    expect(next).to.have.calledOnce;
  });
});