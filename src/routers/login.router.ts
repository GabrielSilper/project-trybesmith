import { Router } from 'express';
import loginController from 'src/controllers/login.controller';

const loginRouter = Router();

loginRouter.post('/', loginController.signIn);

export default loginRouter;