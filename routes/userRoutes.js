import express from "express";
import {
  loginController,
  registerController,
  getUsersController,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/getusers", getUsersController);
userRouter.post("/register", registerController);
userRouter.post("/login", loginController);

export default userRouter;
