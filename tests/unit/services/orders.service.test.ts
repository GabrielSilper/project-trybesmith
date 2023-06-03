import { expect } from 'chai';
import { it } from 'mocha';
import sinon from 'sinon';
import OrderModel from '../../../src/database/models/order.model';
import ProductModel from '../../../src/database/models/product.model';
import orderMock from '../../mocks/order.mock';
import productMock from '../../mocks/product.mock';
import orderService from '../../../src/services/order.service';
import { CREATED, NOT_FOUND, OK } from '../../../src/constants/httpCodes';
import UserModel from '../../../src/database/models/user.model';
import loginMock from '../../mocks/login.mock';

describe('OrdersService', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Verificando a função getAll.', async () => {
    sinon.stub(OrderModel, 'findAll').resolves(orderMock.ordersBuild);
    sinon.stub(ProductModel, 'findAll').resolves(productMock.productsInstances);

    const serviceResult = await orderService.getAll();

    expect(serviceResult.type).to.be.null;
    expect(serviceResult.status).to.be.equal(OK);
    expect(serviceResult.message).to.deep.equal(orderMock.ordersWithProductIds);
  });

  describe('Verificando a função create.', () => {
    it('Retorno caso o usuário passado não exista.', async () => {
      sinon.stub(UserModel, 'findByPk').resolves(null);

      const serviceResult = await orderService.create(45, [1, 2]);

      expect(serviceResult.type).to.be.equal('NOT_FOUND');
      expect(serviceResult.status).to.be.equal(NOT_FOUND);
      expect(serviceResult.message).to.deep.equal('"userId" not found');
    });

    it('Retorno caso de sucesso.', async () => {
      sinon.stub(UserModel, 'findByPk').resolves(loginMock.loginBuild);
      sinon.stub(OrderModel, 'create').resolves(orderMock.ordersBuild[0]);
      sinon.stub(ProductModel, 'update').resolves([2]);

      const serviceResult = await orderService.create(1, [1, 2]);

      expect(serviceResult.type).to.be.null;
      expect(serviceResult.status).to.be.equal(CREATED);
      expect(serviceResult.message).to.deep.equal(orderMock.newOrderMessage);
    });
  });
});
