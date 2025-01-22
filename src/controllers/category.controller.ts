import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/errorHandler";
import { createCategoryService, getCategoriesService, updateCategoryService } from "../services/category.service";
import ApiResponse from "../utils/apiResponse";


export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) {
    throw new ApiError(400, "Name is required");
  }
  const category = await createCategoryService(name);

  if (!category) {
    throw new ApiError(400, "Category alreay exist with this name");
  }
  return res.status(201).json(new ApiResponse(201, category, "Category created successfully"));
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const { isActive } = req.body;
  const { id } = req.params;
  if (!id) {
    throw new ApiError(400, "Id is required");
  }
  const category = await updateCategoryService(id, isActive);
  if (!category) {
    throw new ApiError(400, "Category not found with this id");
  }
  return res.status(200).json(new ApiResponse(200, category, "Category updated successfully"));
});

export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const categories = await getCategoriesService();
  if (!categories) {
    throw new ApiError(404, "Categories not found");
  }
  return res.status(200).json(new ApiResponse(200, categories, "Categories fetched successfully"));
});