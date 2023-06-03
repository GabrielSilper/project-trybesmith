import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import { it } from 'mocha';
import orderService from '../../../src/services/order.service';
import orderController from '../../../src/controllers/order.controller';
import orderMock from '../../mocks/order.mock';
import { CREATED, NOT_FOUND, OK } from '../../../src/constants/httpCodes';

chai.use(sinonChai);

describe('OrdersController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Verificando a função getAll', async () => {
    sinon.stub(orderService, 'getAll').resolves(orderMock.ordersResponse);

    await orderController.getAll(req, res);

    expect(res.status).to.have.calledWith(OK);
    expect(res.json).to.have.calledWith(orderMock.ordersResponse.message);
  });

  describe('Verificando a função create.', () => {
    it('Retorno caso aconteça algum tipo de erro.', async () => {
      sinon
        .stub(orderService, 'create')
        .resolves(orderMock.newOrderWrongResponse);

      req.body = orderMock.bodyWithUserNotFound;

      await orderController.create(req, res);

      expect(res.status).to.have.calledWith(NOT_FOUND);
      expect(res.json).to.have.calledWith({
        message: orderMock.newOrderWrongResponse.message,
      });
    });

    it('Retorno caso de sucesso.', async () => {
      sinon.stub(orderService, 'create').resolves(orderMock.newOrderOkResponse);

      req.body = orderMock.newOrderMessage;

      await orderController.create(req, res);

      expect(res.status).to.have.calledWith(CREATED);
      expect(res.json).to.have.calledWith(orderMock.newOrderOkResponse.message);
    });
  });
});
