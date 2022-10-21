import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
// import productRouter from "./routes/productsRoutes.js";
// import billsRouter from "./routes/billsRoutes.js";
// import categoryRouter from "./routes/categoryRouter.js";
// import loginRouter from "./routes/loginRouters.js";

dotenv.config();
// "mongodb+srv://Abduganiy:rmFMzmMajqOVdFSC@cluster0.18iey.mongodb.net/?portfolio=true&w=majority"
// "mongodb+srv://muhiddin:Prgr55=hppn55@cluster0.r97pr.mongodb.net/pos",

// connect with mongodb cJ#4X_iDNhWP.8f
// mongoose
//   .connect(
//     "mongodb+srv://muhiddin:Prgr55=hppn55@cluster0.r97pr.mongodb.net/?pos=true&w=majority"
//   )
//   .then(() => {
//     console.log("connected to DB");
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

//routes
// app.use("/api/login/", loginRouter);
// app.use("/api/products/", productRouter);
// app.use("/api/bills/", billsRouter);
// app.use("/api/category/", categoryRouter);
app.get("/", (_, res) => {
  res.send("ok");
});
//create port
const PORT = 8880;

//listen
app.listen(PORT, () => {
  console.log(`server is running on port: http://localhost:${PORT}`);
});
