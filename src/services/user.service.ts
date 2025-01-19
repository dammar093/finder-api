import User, { UserInterface } from "../models/user.model";
import bcrypt from "bcrypt";
import ApiError from "../utils/errorHandler";

//signup service 
export const createUserService = async (user: UserInterface) => {

  try {
    const exitUser = await User.findOne({ email: user?.email, phoneNumber: user?.phoneNumber });
    console.log("exist", exitUser);

    if (exitUser) {
      throw new ApiError(400, "User already exist with this email")
    }
    const hashedPassword = bcrypt.hashSync(user?.password, 10);
    console.log(hashedPassword);

    const savedUser = await User.create({
      fullName: user?.fullName,
      email: user?.email,
      password: hashedPassword,
      phoneNumber: user?.phoneNumber,
    });
    return savedUser;
  } catch (error) {
    console.log("errr", error);
    throw new ApiError(500, "Something went wrong please try again")
  }
}

// sign in service 
export const signInService = async ({ email, password }: { email: string, password: string }) => {

  try {
    const getUser = await User.findOne({ email: email })

    if (!getUser) {
      throw new Error("Invalid email or password")
    }
    const isPasswordValid = await bcrypt.compare(password, getUser?.password);
    console.log(isPasswordValid);

    if (!isPasswordValid) {
      throw new Error('Invalid email or password');
    }
    return getUser;
  } catch (error) {
    throw new ApiError(401, "Invalid email or password")
  }
}

// forgot password checking the email is exist or not
export const forgotPasswordService = async (email: string) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new ApiError(404, "User not found with this email")
    }
    return user;
  } catch (error) {
    throw new ApiError(500, "Something went wrong please try again")
  }
}

// update user with otp
export const updateUserWithOTPService = async (email: string, otp: string) => {
  try {
    const user = await User.findOneAndUpdate({ email: email }, { otp: otp }, { new: true });
    return user;
  } catch (error) {
    throw new ApiError(500, "Something went wrong please try again")
  }
}

// verify otp 
export const verifyOTPService = async (email: string, otp: string) => {
  try {
    const user = await User.findOne({ email: email, otp: otp });
    if (!user) {
      throw new ApiError(400, "Invalid otp")
    }
    return user;
  } catch (error) {
    throw new ApiError(500, "Something went wrong please try again")
  }
}

// reset password
export const resetPasswordService = async (otp: string, email: string, password: string) => {
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await User.findOneAndUpdate({ email: email, otp: otp }, {
      $set: {
        password: hashedPassword,
        otp: ""
      }
    }, { new: true });

    return user;
  } catch (error) {
    throw new ApiError(500, "Something went wrong please try again")
  }
}