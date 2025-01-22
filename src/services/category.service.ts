import Category from "../models/category.model";
import ApiError from "../utils/errorHandler";

export const createCategoryService = async (name: string) => {

  //check if category already exists
  const existCategory = await Category.findOne({ name });
  if (existCategory) {
    throw new ApiError(400, "Category already exists");
  }
  //create category
  const category = await Category.create({ name });
  return category;
};