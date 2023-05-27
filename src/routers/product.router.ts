import { Router } from 'express';
import productController from '../controllers/product.controller';
import validateProduct from '../middleware/validateProduct';

const productRouter = Router();

productRouter.get('/', productController.getAll);
productRouter.post('/', validateProduct, productController.create);

export default productRouter;
