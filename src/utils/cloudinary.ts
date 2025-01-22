import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import ApiError from './errorHandler';
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (file: any) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      folder: "finder",
      resource_type: "image",
    });
    return result.secure_url;
  } catch (error: any) {
    throw new ApiError(500, error.message);
  }
}