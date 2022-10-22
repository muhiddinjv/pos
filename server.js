import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routes/productsRoutes.js";
import userRouter from "./routes/userRoutes.js";
import billsRouter from "./routes/billsRoutes.js";
// import pkg from "express-openid-connect";
// const { auth, requiresAuth } = pkg;

dotenv.config();

// connect with mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   baseURL: process.env.BASE_URL,
//   clientID: process.env.CLIENT_ID,
//   issuerBaseURL: process.env.ISSUER_BASE_URL,
//   secret: process.env.APP_SESSION_SECRET,
// };

//middlewares
// app.use(auth(config));
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
app.use("/api/products/", productRouter);
app.use("/api/users/", userRouter);
app.use("/api/bills/", billsRouter);

//create port
const PORT = process.env.PORT || 5000;

//listen
app.listen(PORT, () => {
  console.log(`server is running on port: http://localhost:${PORT}`);
});
