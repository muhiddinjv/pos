import express from 'express';
import {getCategoryController,addCategoryController } from '../controllers/categoryController.js';


const categoryRouter = express.Router();

categoryRouter
    .get("/getCategory", getCategoryController)
    .post("/addcategory", addCategoryController)

export default categoryRouter;