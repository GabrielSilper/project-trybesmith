import { OrderWithProductIds } from 'src/types/OrderWithProductIds';
import ProductModel from '../database/models/product.model';
import OrderModel from '../database/models/order.model';
import { ServiceData } from '../types/ServiceData';
import { OK } from '../constants/httpCodes';

const getAll = async (): Promise<ServiceData<OrderWithProductIds[]>> => {
  const results = await OrderModel.findAll();
  const orders = results.map((order) => order.dataValues);
  const resultsProducts = await ProductModel.findAll();
  const products = resultsProducts.map((product) => product.dataValues);

  const orderWithProducts = orders.map((order) => {
    const productIds = products
      .filter((product) => (product.orderId === order.id))
      .map((product) => product.id);
    return { id: order.id, userId: order.userId, productIds };
  });

  return { type: null, status: OK, message: orderWithProducts };
};

export default {
  getAll,
};
