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

export const updateCategoryService = async (id: string, isActive: boolean) => {

  //check if category exists
  const category = await Category.findById(id);
  if (!category) {
    throw new ApiError(400, "Category not found");
  }
  //update category
  category.isActive = isActive;
  await category.save();
  return category;
}

export const getCategoriesService = async () => {
  const categories = await Category.find();
  return categories;
};