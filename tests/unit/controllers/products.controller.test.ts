import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { Request, Response } from 'express';
import productMock from '../../mocks/product.mock';
import productService from '../../../src/services/product.service';
import productController from '../../../src/controllers/product.controller';
import { it } from 'mocha';
import { CREATED, OK } from '../../../src/constants/httpCodes';

chai.use(sinonChai);

describe('ProductsController', function () {
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    sinon.restore();
  });

  it('Vericando a função create.', async () => {
    req.body = productMock.newProductMock;
    sinon.stub(productService, 'create').resolves(productMock.createdResponse);

    await productController.create(req, res);

    expect(res.status).to.have.calledWith(CREATED);
    expect(res.json).to.have.calledWith(productMock.createdResponse.message);
  });

  it('Vericando a função getAll.', async () => {
    sinon.stub(productService, 'getAll').resolves(productMock.productsResponse);

    await productController.getAll(req, res);

    expect(res.status).to.have.calledWith(OK);
    expect(res.json).to.have.calledWith(productMock.productsResponse.message);
  });
});
