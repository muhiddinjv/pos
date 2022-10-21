import Category from "../models/categoryModel.js";

export const getCategoryController = async (req, res) => {
  try {
    res.send(await Category.find().populate("Product"));
  } catch (error) {
    console.log(error);
  }
};

export const addCategoryController = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    await newCategory.save();
    res.send("New category created successfully!");
  } catch (error) {
    console.log(error);
  }
};
