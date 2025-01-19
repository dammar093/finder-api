"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.verifyOTP = exports.forgotPassword = exports.loggedInUser = exports.signIn = exports.createUser = void 0;
const user_service_1 = require("../services/user.service");
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
const sendOTP_1 = __importDefault(require("../utils/sendOTP"));
const generateOTP_1 = __importDefault(require("../utils/generateOTP"));
// resister user
exports.createUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, phoneNumber, password } = req.body;
    try {
        if (!fullName) {
            throw new errorHandler_1.default(400, "Fullname is required");
        }
        if (!email) {
            throw new errorHandler_1.default(400, "Email is required");
        }
        if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email))) {
            throw new errorHandler_1.default(400, "Invalid email");
        }
        if (!password) {
            throw new errorHandler_1.default(400, "Password is required");
        }
        if (password.length < 8) {
            throw new errorHandler_1.default(400, "Password length have at least 8 charecters");
        }
        if (!phoneNumber) {
            throw new errorHandler_1.default(400, "Phone numer is required");
        }
        if (!(/^\+?[1-9]\d{1,14}$/.test(phoneNumber))) {
            throw new errorHandler_1.default(400, "Invalid phone number");
        }
        const { _id } = yield (0, user_service_1.createUserService)(req.body);
        const token = jsonwebtoken_1.default.sign({ _id }, process.env.JWT_SECRET);
        if (!token) {
            throw new errorHandler_1.default(500, "sjkjfsdlkj.");
        }
        return res.cookie("token", token, {
            httpOnly: true,
            secure: true,
        }).status(201).json(new apiResponse_1.default(201, token, "Registred successfully"));
    }
    catch (error) {
        throw new errorHandler_1.default(400, "Something went wrong please try again");
    }
}));
// sign in user
exports.signIn = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email) {
            throw new errorHandler_1.default(400, "Email is required");
        }
        if (!password) {
            throw new errorHandler_1.default(400, "Password is required");
        }
        const { _id } = yield (0, user_service_1.signInService)(req.body);
        const token = jsonwebtoken_1.default.sign({ _id }, process.env.JWT_SECRET);
        return res.cookie("token", token, {
            httpOnly: true,
            secure: true
        }).status(201).json(new apiResponse_1.default(200, token, "Logged in successfully"));
    }
    catch (error) {
        throw new errorHandler_1.default(401, "Invalid email or password");
    }
}));
//get logged in user
//get current user
exports.loggedInUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.user);
    //@ts-ignore
    console.log(req.user);
    return res
        .status(200)
        .json(new apiResponse_1.default(200, 
    //@ts-ignore
    req.user, "User fetched successfully"));
}));
// forgot password
exports.forgotPassword = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const existUser = yield (0, user_service_1.forgotPasswordService)(email);
        if (!existUser) {
            throw new errorHandler_1.default(404, "User not found with this email");
        }
        else {
            //sendOTP(email, otp)
            const opt = (0, generateOTP_1.default)();
            (0, sendOTP_1.default)(email, opt, existUser.fullName, "Reset Your Finder Password");
            (0, user_service_1.updateUserWithOTPService)(email, opt);
        }
        if (!email) {
            throw new errorHandler_1.default(400, "Email is required");
        }
        return res.status(200).json(new apiResponse_1.default(200, null, "Email sent successfully"));
    }
    catch (error) {
        throw new errorHandler_1.default(500, "Something went wrong please try again");
    }
}));
//verifying otp 
exports.verifyOTP = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, otp } = req.body;
    try {
        if (!email) {
            throw new errorHandler_1.default(400, "Email is required");
        }
        if (!otp) {
            throw new errorHandler_1.default(400, "OTP is required");
        }
        const user = yield (0, user_service_1.verifyOTPService)(email, otp);
        if (!user) {
            throw new errorHandler_1.default(400, "Invalid OTP");
        }
        return res.status(200).json(new apiResponse_1.default(200, null, "OTP verified successfully"));
    }
    catch (error) {
        throw new errorHandler_1.default(500, "Something went wrong please try again");
    }
}));
//reset password
exports.resetPassword = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, email, password } = req.body;
    try {
        if (!email) {
            throw new errorHandler_1.default(400, "Email is required");
        }
        if (!password) {
            throw new errorHandler_1.default(400, "Password is required");
        }
        if (password.length < 8) {
            throw new errorHandler_1.default(400, "Password length have at least 8 charecters");
        }
        const user = yield (0, user_service_1.resetPasswordService)(otp, email, password);
        if (!user) {
            throw new errorHandler_1.default(404, "User not found with this email");
        }
        return res.status(200).json(new apiResponse_1.default(200, null, "Password reset successfully"));
    }
    catch (error) {
        throw new errorHandler_1.default(500, "Something went wrong please try again");
    }
}));
