import express from 'express';
import { loginController, userController } from '../controllers/userController.js';

const userRouter = express.Router();

productRouter.get("/login", loginController);
productRouter.post("/register", userController);

export default userRouter;