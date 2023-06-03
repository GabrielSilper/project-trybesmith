import { CREATED, NOT_FOUND, OK } from '../../src/constants/httpCodes';
import OrderModel from '../../src/database/models/order.model';
import { Order } from '../../src/types/Order';
import { OrderWithProductIds } from '../../src/types/OrderWithProductIds';
import { ServiceData } from '../../src/types/ServiceData';

const orders: Order[] = [
  {
    id: 1,
    userId: 1,
  },
  {
    id: 2,
    userId: 2,
  },
];

const ordersBuild = orders.map((order) => OrderModel.build(order));

const ordersWithProductIds: OrderWithProductIds[] = [
  { id: 1, userId: 1, productIds: [1, 2] },
  { id: 2, userId: 2, productIds: [] },
];

const ordersResponse: ServiceData<OrderWithProductIds[]> = {
  type: null,
  status: OK,
  message: ordersWithProductIds,
};

const newOrderMessage = {
  userId: 1,
  productIds: [1, 2],
};

const newOrderWrongResponse: ServiceData<string> = {
  type: 'NOT_FOUND',
  status: NOT_FOUND,
  message: '"userId" not found',
};

const bodyWithUserNotFound = {
  userId: 12345,
  productIds: [1, 2],
};

const newOrderOkResponse: ServiceData<any> = {
  type: null,
  status: CREATED,
  message: newOrderMessage,
};

const bodyWithoutAKey = {
  productIds: [1, 2],
};

const bodyWithoutProducts = {
  userId: 12345,
  productIds: [],
};

const bodyUnpprocessable = {
  userId: '1',
  productIds: [1,2],
};

export default {
  orders,
  ordersBuild,
  ordersWithProductIds,
  ordersResponse,
  newOrderMessage,
  newOrderWrongResponse,
  bodyWithUserNotFound,
  newOrderOkResponse,
  bodyWithoutAKey,
  bodyWithoutProducts,
  bodyUnpprocessable
};
