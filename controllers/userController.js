import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const loginController = async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name, password });

  if (user) {
    // generate an access token
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      "myAccessSecretKey"
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
};

export const registerController = async (req, res) => {
  const { name, password } = req.body;
  const userExists = await User.exists({ name, password });
  if (userExists) {
    res.status(422).send();
  } else {
    const newUser = new User({ ...req.body, isAdmin: false });
    await newUser.save();
    res.status(200).send();
  }
};

export const getUsersController = async (_, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
};

export const delUserController = async (req, res) => {
  try {
    await User.findOneAndDelete({
      _id: req.body.userId,
    });
    res.status(200).json("User Deleted!");
  } catch (error) {
    console.log(error);
  }
};
