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
exports.resetPasswordService = exports.verifyOTPService = exports.updateUserWithOTPService = exports.forgotPasswordService = exports.signInService = exports.createUserService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
//signup service 
const createUserService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const exitUser = yield user_model_1.default.findOne({ email: user === null || user === void 0 ? void 0 : user.email, phoneNumber: user === null || user === void 0 ? void 0 : user.phoneNumber });
        console.log("exist", exitUser);
        if (exitUser) {
            throw new errorHandler_1.default(400, "User already exist with this email");
        }
        const hashedPassword = bcrypt_1.default.hashSync(user === null || user === void 0 ? void 0 : user.password, 10);
        console.log(hashedPassword);
        const savedUser = yield user_model_1.default.create({
            fullName: user === null || user === void 0 ? void 0 : user.fullName,
            email: user === null || user === void 0 ? void 0 : user.email,
            password: hashedPassword,
            phoneNumber: user === null || user === void 0 ? void 0 : user.phoneNumber,
        });
        return savedUser;
    }
    catch (error) {
        console.log("errr", error);
        throw new errorHandler_1.default(500, "Something went wrong please try again");
    }
});
exports.createUserService = createUserService;
// sign in service 
const signInService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password }) {
    try {
        const getUser = yield user_model_1.default.findOne({ email: email });
        if (!getUser) {
            throw new Error("Invalid email or password");
        }
        const isPasswordValid = yield bcrypt_1.default.compare(password, getUser === null || getUser === void 0 ? void 0 : getUser.password);
        console.log(isPasswordValid);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        return getUser;
    }
    catch (error) {
        throw new errorHandler_1.default(401, "Invalid email or password");
    }
});
exports.signInService = signInService;
// forgot password checking the email is exist or not
const forgotPasswordService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: email });
        if (!user) {
            throw new errorHandler_1.default(404, "User not found with this email");
        }
        return user;
    }
    catch (error) {
        throw new errorHandler_1.default(500, "Something went wrong please try again");
    }
});
exports.forgotPasswordService = forgotPasswordService;
// update user with otp
const updateUserWithOTPService = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOneAndUpdate({ email: email }, { otp: otp }, { new: true });
        return user;
    }
    catch (error) {
        throw new errorHandler_1.default(500, "Something went wrong please try again");
    }
});
exports.updateUserWithOTPService = updateUserWithOTPService;
// verify otp 
const verifyOTPService = (email, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: email, otp: otp });
        if (!user) {
            throw new errorHandler_1.default(400, "Invalid otp");
        }
        return user;
    }
    catch (error) {
        throw new errorHandler_1.default(500, "Something went wrong please try again");
    }
});
exports.verifyOTPService = verifyOTPService;
// reset password
const resetPasswordService = (otp, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const user = yield user_model_1.default.findOneAndUpdate({ email: email, otp: otp }, {
            $set: {
                password: hashedPassword,
                otp: ""
            }
        }, { new: true });
        return user;
    }
    catch (error) {
        throw new errorHandler_1.default(500, "Something went wrong please try again");
    }
});
exports.resetPasswordService = resetPasswordService;
