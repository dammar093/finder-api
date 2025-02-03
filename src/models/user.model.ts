import mongoose, { Schema, Document } from "mongoose";
/**
 * @openapi
 * components:
 *   schemas:
 *     Users:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: dammarrana0931@gmail.com
 *         fullName:
 *           type: string
 *           example: Dammar Singh Rana
 *         phoneNumber:
 *           type: string
 *           example: +1234567890
 *         password:
 *           type: string
 *           example: password123
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *           example: male
 *         profile:
 *           type: string
 *           example: ""
 *         role:
 *           type: string
 *           enum: [user, admin]
 *           example: user
 *         isVerified:
 *           type: boolean
 *           example: false
 *         otp:
 *           type: string
 *           example: ""
 *      
 */
// Interface for User
export interface UserInterface extends Document {
  fullName: string;
  email: string;
  phoneNumber: string;
  password: string;
  gender?: string;
  profile?: string;
  role?: string,
  isVerified?: boolean,
  otp?: string
}

// User Schema
const userSchema = new Schema<UserInterface>({
  fullName: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 6 characters long"],
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    match: [/^\+?[1-9]\d{1,14}$/, "Please fill a valid phone number"],
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: "male",
  },
  profile: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    type: String,
    default: ""
  }
}, { timestamps: true });

// User Model
const User = mongoose.model<UserInterface>("User", userSchema);

export default User;
