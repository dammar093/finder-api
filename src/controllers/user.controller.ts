import { Request, Response } from 'express';
import { createUserService, forgotPasswordService, resetPasswordService, signInService, updateUserWithOTPService, verifyOTPService } from '../services/user.service';
import asyncHandler from '../utils/asyncHandler';
import jwt from "jsonwebtoken";
import ApiError from '../utils/errorHandler';
import ApiResponse from '../utils/apiResponse';
import sendOTP from '../utils/sendOTP';
import generateOTP from '../utils/generateOTP';

// resister user
export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { fullName, email, phoneNumber, password } = req.body;
  try {
    if (!fullName) {
      throw new ApiError(400, "Fullname is required")
    }
    if (!email) {
      throw new ApiError(400, "Email is required")
    }
    if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email))) {
      throw new ApiError(400, "Invalid email")
    }
    if (!password) {
      throw new ApiError(400, "Password is required")
    }
    if (password.length < 8) {
      throw new ApiError(400, "Password length have at least 8 charecters")
    }
    if (!phoneNumber) {
      throw new ApiError(400, "Phone numer is required")
    }
    if (!(/^\+?[1-9]\d{1,14}$/.test(phoneNumber))) {
      throw new ApiError(400, "Invalid phone number")
    }
    const { _id } = await createUserService(req.body);

    const token = jwt.sign({ _id }, process.env.JWT_SECRET!);
    if (!token) {
      throw new ApiError(500, "sjkjfsdlkj.")
    }
    return res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    }).status(201).json(new ApiResponse(
      201,
      token,
      "Registred successfully"
    ));
  } catch (error) {
    throw new ApiError(500, "Something went wrong please try again")
  }
});

// sign in user
export const signIn = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {

    if (!email) {
      throw new ApiError(400, "Email is required")
    }
    if (!password) {
      throw new ApiError(400, "Password is required")
    }
    const { _id } = await signInService(req.body);
    const token = jwt.sign({ _id }, process.env.JWT_SECRET!);
    return res.cookie("token", token, {
      httpOnly: true,
      secure: true
    }).status(201).json(new ApiResponse(200, token, "Logged in successfully"));
  } catch (error: any) {
    throw new ApiError(401, "Invalid email or password")
  }
})

//get logged in user
//get current user
export const loggedInUser = asyncHandler(async (req: Request, res: Response) => {
  // console.log(req.user);
  //@ts-ignore
  console.log(req.user);

  return res
    .status(200)
    .json(new ApiResponse(
      200,
      //@ts-ignore
      req.user,
      "User fetched successfully"
    ))
})

// forgot password
export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const existUser = await forgotPasswordService(email);
    if (!existUser) {
      throw new ApiError(404, "User not found with this email")
    } else {
      //sendOTP(email, otp)
      const opt = generateOTP()
      sendOTP(email, opt, existUser.fullName, "Reset Your Finder Password")
      updateUserWithOTPService(email, opt)
    }
    if (!email) {
      throw new ApiError(400, "Email is required")
    }
    return res.status(200).json(new ApiResponse(200, null, "Email sent successfully"))
  } catch (error) {
    throw new ApiError(500, "Something went wrong please try again")
  }
});

//verifying otp 
export const verifyOTP = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  try {
    if (!email) {
      throw new ApiError(400, "Email is required")
    }
    if (!otp) {
      throw new ApiError(400, "OTP is required")
    }
    const user = await verifyOTPService(email, otp);
    if (!user) {
      throw new ApiError(400, "Invalid OTP")
    }
    return res.status(200).json(new ApiResponse(200, null, "OTP verified successfully"))
  } catch (error) {
    throw new ApiError(500, "Something went wrong please try again")
  }
});

//reset password
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { otp, email, password } = req.body;
  try {
    if (!email) {
      throw new ApiError(400, "Email is required")
    }
    if (!password) {
      throw new ApiError(400, "Password is required")
    }
    if (password.length < 8) {
      throw new ApiError(400, "Password length have at least 8 charecters")
    }
    const user = await resetPasswordService(otp, email, password);
    if (!user) {
      throw new ApiError(404, "User not found with this email")
    }
    return res.status(200).json(new ApiResponse(200, null, "Password reset successfully"))
  } catch (error) {
    throw new ApiError(500, "Something went wrong please try again")
  }
})