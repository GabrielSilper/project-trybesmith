import { Router } from 'express';
import productController from '../controllers/product.controller';

const productRouter = Router();

productRouter.get('/', productController.getAll);
productRouter.post('/', productController.create);

export default productRouter;
