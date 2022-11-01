import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

let refreshTokens = [];

export const refreshController = async (req, res) => {
  // take the refresh token from the user
  const refreshToken = req.body.token;

  // send error if there's no token or it's invalid
  if (!refreshToken) return res.status(401).json("You are not authenticated!");

  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json("Refresh token is not valid!");
  }

  jwt.verify(refreshToken, "myRefreshSecretKey", (err, user) => {
    err && console.log(err);
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    refreshTokens.push(newRefreshToken);

    // if all's ok, create new access & refresh tokens & send to user
    res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  });
};

const generateAccessToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myAccessSecretKey", {
    expiresIn: "30m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user.id, isAdmin: user.isAdmin }, "myRefreshSecretKey");
};

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    // const user = await User.findOne({ username, password });

    const user = await User.findOne({ username, password });
    // const user = users.find(
    //   (u) => u.username === username && u.password === password
    // );
    console.log("user: ", user);

    if (user) {
      // res.status(200).send(user);
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      refreshTokens.push(refreshToken);

      res.status(200).send({
        username: user.username,
        isAdmin: user.isAdmin,
        accessToken,
        refreshToken,
      });
    } else {
      res.status(400).json({
        message: "Username or password incorrect!",
        user,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// const verify = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (authHeader) {
//     const token = authHeader.split(" ")[1];
//     jwt.verify(token, "myAccessSecretKey", (err, user) => {
//       if (err) {
//         return res.status(403).json("Invalid Token");
//       }
//       req.user = user;
//       next();
//     });
//   } else {
//     res.status(401).json("You are not authorized");
//   }
// };

// app.delete("/users/:id", verify, (req, res) => {
//   if (req.user.id === req.params.userId || req.user.isAdmin) {
//     res.status(200).json("User has been deleted!");
//   } else {
//     res.status(403).json("You cant delete this user");
//   }
// });

export const logoutController = async (req, res) => {
  try {
    const refreshToken = req.body.token;
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
    res.status(200).send("Logged Out Successfully!");
  } catch (error) {
    console.log(error);
  }
};

export const registerController = async (req, res) => {
  try {
    const newUser = new User({ ...req.body, isAdmin: false });
    await newUser.save();
    res.status(200).send("New User Added Successfully!");
  } catch (error) {
    console.log(error);
  }
};
