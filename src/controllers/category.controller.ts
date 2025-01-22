import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import ApiError from "../utils/errorHandler";
import { createCategoryService } from "../services/category.service";
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