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

import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
  "mongodb+srv://muhiddin:p455w0rd@pos.udur8zi.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

client.connect((err, db) => {
  const collection = client.db("pos").collection("products");
  client.close();
});

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

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/new", (req, res) => {
  res.send(dbcollection);
});

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
