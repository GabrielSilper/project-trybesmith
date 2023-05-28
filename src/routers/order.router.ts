import { Router } from 'express';
import orderController from '../controllers/order.controller';
import validateOrder from '../middleware/validateOrder';

const orderRouter = Router();

orderRouter.get('/', orderController.getAll);
orderRouter.post('/', validateOrder, orderController.create);

export default orderRouter;