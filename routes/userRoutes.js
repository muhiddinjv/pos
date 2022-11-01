import express from "express";
import {
  loginController,
  logoutController,
  refreshController,
  registerController,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.post("/logout", logoutController);
userRouter.post("/refresh", refreshController);

export default userRouter;
