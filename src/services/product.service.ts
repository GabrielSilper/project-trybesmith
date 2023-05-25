import { CREATED } from '../constants/httpCodes';
import ProductModel, { ProductInputtableTypes } from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceData } from '../types/ServiceData';

const create = async (product: ProductInputtableTypes): Promise<ServiceData<Product>> => {
  const newProduct = await ProductModel.create(product);
  return { type: null, status: CREATED, message: newProduct.dataValues };
};

export default {
  create,
};
