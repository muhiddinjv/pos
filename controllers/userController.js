import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

export const registerController = async (req, res) => {
  const { name, email, birthday, password } = req.body;
  const userExists = await User.exists({ name, password });
  if (userExists) {
    res.status(422).send();
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name: name,
      email: email,
      birthday: birthday,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(200).send();
  }
};

export const loginController = async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name });
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (isPasswordValid) {
    // generate an access token
    const accessToken = jwt.sign(
      { id: user._id, name: user.name, isAdmin: user.isAdmin },
      "myAccessSecretKey"
    );

    res.status(200).send({
      user: accessToken,
    });
  } else {
    res.status(400).send({
      message: "name or password incorrect!",
      user,
    });
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
