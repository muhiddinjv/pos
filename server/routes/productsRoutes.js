import express from 'express';
import { getProductController,addProductController,updateProductController } from '../controllers/productController.js';

const productRouter = express.Router();

productRouter.get("/getproducts", getProductController);
productRouter.post("/addproducts", addProductController);
productRouter.put("/udpateproducts", updateProductController);

export default productRouter;