import { CREATED } from 'src/constants/httpCodes';
import ProductModel, { ProductInputtableTypes } from 'src/database/models/product.model';
import { Product } from 'src/types/Product';
import { ServiceData } from 'src/types/ServiceData';

const create = async (product: ProductInputtableTypes): Promise<ServiceData<Product>> => {
  const newProduct = await ProductModel.create(product);
  return { type: null, status: CREATED, message: newProduct.dataValues };
};

export default {
  create,
};
