import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const getUsersController = async (_, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
};

export const loginController = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name, password });

    if (user) {
      const accessToken = jwt.sign(
        { id: user.id, isAdmin: user.isAdmin },
        process.env.SECRET_KEY
      );

      res.status(200).send({
        name: user.name,
        isAdmin: user.isAdmin,
        accessToken,
      });
    } else {
      res.status(400).json({
        message: "name or password incorrect!",
        user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const registerController = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name, password });
    if (user) {
      res.status(400).send({
        message: "name or password exists!",
      });
    }
    const newUser = new User({ ...req.body, isAdmin: false });
    await newUser.save();
    res.status(200).send("New User Added Successfully!");
  } catch (error) {
    console.log(error);
  }
};
