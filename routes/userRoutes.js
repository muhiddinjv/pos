import express from "express";
import {
  loginController,
  registerController,
  getUsersController,
  delUserController,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.post("/deluser", delUserController);
userRouter.get("/getusers", getUsersController);

export default userRouter;
