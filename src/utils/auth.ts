import ApiError from "./errorHandler";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import asyncHandler from "./asyncHandler";
import User from "../models/user.model";

const verifyJwtToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Access token is required");
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);

    //@ts-ignore
    const user = await User.findById(decodedToken?._id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    //@ts-ignore
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new ApiError(401, "Invalid access token");
    }
    if (error instanceof jwt.TokenExpiredError) {
      throw new ApiError(401, "Token has expired");
    }
    throw new ApiError(500, "An error occurred while verifying the token");
  }
});

export default verifyJwtToken;