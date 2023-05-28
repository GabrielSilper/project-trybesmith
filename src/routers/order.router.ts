import { Router } from 'express';
import orderController from '../controllers/order.controller';
import validateOrder from '../middleware/validateOrder';
import validateToken from '../middleware/validateToken';

const orderRouter = Router();

orderRouter.get('/', orderController.getAll);
orderRouter.use(validateToken);
orderRouter.post('/', validateOrder, orderController.create);

export default orderRouter;
