import User from "../models/userModel.js";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const users = [
  {
    id: "1",
    pincode: "1122",
    username: "john",
    password: "john0908",
    verified: true,
  },
  {
    id: "2",
    pincode: "3344",
    username: "Jane",
    password: "Jane0908",
    verified: false,
  },
];

export const loginController = async (req, res) => {
  try {
    const { pincode, password } = req.body;
    // const user = await User.findOne({ pincode, password, verified: true });
    const user = users.find(
      (u) => u.pincode === pincode && u.password === password
    );
    console.log(user);
    if (user) {
      // res.status(200).send(user);

      const accessToken = jwt.sign(
        { id: user.id, verified: user.verified },
        process.env.SECRET_KEY
      );
      res.status(200).send({
        pincode: user.pincode,
        verified: user.verified,
        accessToken,
      });
    } else {
      res.json({
        message: "Login Failed!",
        user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const registerController = async (req, res) => {
  try {
    const newUser = new User({ ...req.body, verified: true });
    await newUser.save();
    res.status(200).send("New User Added Successfully!");
  } catch (error) {
    console.log(error);
  }
};
