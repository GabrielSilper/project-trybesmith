import { expect } from 'chai';
import { it } from 'mocha';
import sinon from 'sinon';
import ProductModel from '../../../src/database/models/product.model';
import productService from '../../../src/services/product.service';
import productMock from '../../mocks/product.mock';
import Sinon from 'sinon';
import { CREATED, OK } from '../../../src/constants/httpCodes';

describe('ProductsService', function () {
  beforeEach(function () {
    sinon.restore();
  });

  it('Verificando a função create.', async () => {
    const newProduct = ProductModel.build(productMock.newProductMock);
    Sinon.stub(ProductModel, 'create').resolves(newProduct);

    const serviceResult = await productService.create(
      productMock.newProductMock
    );

    expect(serviceResult.type).to.be.null;
    expect(serviceResult.status).to.be.equal(CREATED);
    expect(serviceResult.message).to.deep.equal(newProduct.dataValues);
  });

  it('Verificando a função getAll.', async () => {
    Sinon.stub(ProductModel, 'findAll').resolves(productMock.productsInstances);

    const serviceResult = await productService.getAll();

    expect(serviceResult.type).to.be.null;
    expect(serviceResult.status).to.be.equal(OK);
    expect(serviceResult.message).to.deep.equal(productMock.productsMock);
  });
});
