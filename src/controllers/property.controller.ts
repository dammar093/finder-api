import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { uploadImage } from "../utils/cloudinary";
import ApiError from "../utils/errorHandler";
import { createPropertiesService, getPropertiesService, getPropertyService, updatePropertyService } from "../services/property.service";
import ApiResponse from "../utils/apiResponse";

export const createProperty = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, services, price, location, longitude, latitude, duration, duration_type, category } = req.body;
  // @ts-ignore
  const id = req.user._id;
  const image = req.files;
  const images: string[] = [];
  if (!title || !description || !price || !location || !longitude || !latitude || !duration || !duration_type || !services) {
    throw new ApiError(400, "All fields are required");
  }

  if (!image) {
    throw new ApiError(400, "Image is required");
  }

  if (image) {
    if (Array.isArray(image)) {
      for (let i = 0; i < image.length; i++) {
        const result = await uploadImage(image[i].path);
        images.push(result);
      }
    } else {
      const result = await uploadImage(image.path);
      images.push(result);
    }
  }

  const property = await createPropertiesService(title, description, services, price, location, longitude, latitude, true, images, duration, duration_type, category, id);
  if (!property) {
    throw new ApiError(400, "Property not created");
  }
  res.status(201).json(new ApiResponse(201, property, "Property created"));

});

export const getProperties = asyncHandler(async (req: Request, res: Response) => {
  const properties = await getPropertiesService();
  if (!properties) {
    throw new ApiError(404, "Properties not found");
  }
  res.status(200).json(new ApiResponse(200, properties, "Properties found"));
});

export const getProperty = asyncHandler(async (req: Request, res: Response) => {
  const property = await getPropertyService(req.params.id);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }
  res.status(200).json(new ApiResponse(200, property, "Property found"));
});

export const updateProperty = asyncHandler(async (req: Request, res: Response) => {
  const { title, description, services, price, location, longitude, latitude, duration, duration_type, category } = req.body;
  const { id } = req.params

  const property = await updatePropertyService(title, description, price, location, duration, duration_type, services, id)
  if (!property) {
    throw new ApiError(400, "Canot update property")
  }
  return res.status(200).json(
    new ApiResponse(200, property, "Property updated successfully")
  )
})