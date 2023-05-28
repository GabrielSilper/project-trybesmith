import TheSequelize, { Sequelize } from 'sequelize';
import { OrderWithProductIds } from '../types/OrderWithProductIds';
import UserModel from '../database/models/user.model';
import ProductModel from '../database/models/product.model';
import OrderModel from '../database/models/order.model';
import { ServiceData } from '../types/ServiceData';
import { CREATED, NOT_FOUND, OK } from '../constants/httpCodes';
import config from '../database/config/database';

const sequelize = new Sequelize(config);

const getAll = async (): Promise<ServiceData<OrderWithProductIds[]>> => {
  const results = await OrderModel.findAll();
  const orders = results.map((order) => order.dataValues);
  const resultsProducts = await ProductModel.findAll();
  const products = resultsProducts.map((product) => product.dataValues);

  const orderWithProducts = orders.map(({ id, userId }) => {
    const productIds = products
      .filter((product) => product.orderId === id)
      .map((product) => product.id);
    return { id, userId, productIds };
  });

  return { type: null, status: OK, message: orderWithProducts };
};

const create = async (
  userId: number,
  productIds: number[],
): Promise<ServiceData<OrderWithProductIds | string>> => {
  const userFound = await UserModel.findByPk(userId);
  if (!userFound) return { type: 'NOT_FOUND', status: NOT_FOUND, message: '"userId" not found' };

  await sequelize.transaction(async (t: TheSequelize.Transaction) => {
    const newOrder = await OrderModel.create({ userId }, { transaction: t });

    await ProductModel.update(
      { orderId: newOrder.dataValues.id },
      { where: { id: productIds }, transaction: t },
    );
  });

  return {
    type: null,
    status: CREATED,
    message: { userId, productIds } as OrderWithProductIds,
  };
};

export default {
  getAll,
  create,
};
