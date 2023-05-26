import { CREATED, OK } from '../constants/httpCodes';
import ProductModel, {
  ProductInputtableTypes,
  ProductSequelizeModel,
} from '../database/models/product.model';
import { Product } from '../types/Product';
import { ServiceData } from '../types/ServiceData';

const create = async (product: ProductInputtableTypes): Promise<ServiceData<Product>> => {
  const newProduct = await ProductModel.create(product);
  return { type: null, status: CREATED, message: newProduct.dataValues };
};

const getAll = async (): Promise<ServiceData<ProductSequelizeModel[]>> => {
  const products = await ProductModel.findAll();
  return { type: null, status: OK, message: products };
};

export default {
  create,
  getAll,
};
