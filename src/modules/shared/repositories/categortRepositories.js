import Category from "../../../database/models/Category.js";

export const findCategory = async (categoryName) => {
  return await Category.findOne({ categoryName });
};

export const createCategory = async (data) => {
  return await Category.create(data);
};

export const getAllCategories = async () => {
  return await Category.find();
};