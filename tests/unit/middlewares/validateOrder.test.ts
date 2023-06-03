import { Request, Response } from 'express';
import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import sinon from 'sinon';
import validateOrder from '../../../src/middleware/validateOrder';
import {
  BAD_REQUEST,
  UNPPROCESSABLE_ENTITY,
} from '../../../src/constants/httpCodes';
import orderMock from '../../mocks/order.mock';

chai.use(sinonChai);

describe('ValidateOrder Middleware', () => {
  const req = {} as Request;
  const res = {} as Response;
  const next = sinon.stub();

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Messagem de erro para uma chave necessária no body.', () => {
    req.body = orderMock.bodyWithoutAKey;
    validateOrder(req, res, next);
    expect(res.status).to.have.calledWith(BAD_REQUEST);
  });

  it('Messagem de erro para a chave productIds sem nenhum item no body.', () => {
    req.body = orderMock.bodyWithoutProducts;
    validateOrder(req, res, next);
    expect(res.status).to.have.calledWith(UNPPROCESSABLE_ENTITY);
  });

  it('Messagem de erro para um body com informações improcessáveis.', () => {
    req.body = orderMock.bodyUnpprocessable;
    validateOrder(req, res, next);
    expect(res.status).to.have.calledWith(UNPPROCESSABLE_ENTITY);
  });

  it('Chama o próximo middleware com um body correto.', () => {
    req.body = orderMock.newOrderMessage;
    validateOrder(req, res, next);
    expect(next).to.have.calledOnce;
  });
});
