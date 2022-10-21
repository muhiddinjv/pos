import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

export const getProductController = async (req, res) => {
  try {
    res.status(200).send(await Product.find().populate("categoryId"));
  } catch (error) {
    console.log(error);
  }
};

export const addProductController = async (req, res) => {
  try {
    const newProducts = await new Product(req.body);

    const categorie = await Category.findOne({ _id: req.body.categoryId });

    categorie.Product.push(newProducts._id);

    console.log(categorie);

    await categorie.save();
    await newProducts.save();

    res.status(200).send("Product created successfully!");
  } catch (error) {
    console.log(error);
  }
};

export const updateProductController = async (req, res) => {
  try {
    await Product.findOneAndUpdate({ _id: req.body.productId }, req.body, {
      new: true,
    });
    res.status(201).json("Product Updated!");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await Product.findOneAndDelete({ _id: req.body.productId });
    res.status(200).json("Product Deleted!");
  } catch (error) {
    console.log(error);
  }
};
