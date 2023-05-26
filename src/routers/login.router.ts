import { Router } from 'express';
import loginController from '../controllers/login.controller';
import validateLogin from '../middleware/validateLogin';

const loginRouter = Router();

loginRouter.post('/', validateLogin, loginController.signIn);

export default loginRouter;