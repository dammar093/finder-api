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
const errorHandler_1 = __importDefault(require("./errorHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const asyncHandler_1 = __importDefault(require("./asyncHandler"));
const user_model_1 = __importDefault(require("../models/user.model"));
const verifyJwtToken = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const token = ((_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token) || ((_b = req.header("Authorization")) === null || _b === void 0 ? void 0 : _b.replace("Bearer ", ""));
        if (!token) {
            throw new errorHandler_1.default(401, "Access token is required");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        //@ts-ignore
        const user = yield user_model_1.default.findById(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken._id).select("-password");
        if (!user) {
            throw new errorHandler_1.default(401, "Invalid Access Token");
        }
        //@ts-ignore
        req.user = user;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            throw new errorHandler_1.default(401, "Invalid access token");
        }
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new errorHandler_1.default(401, "Token has expired");
        }
        throw new errorHandler_1.default(500, "An error occurred while verifying the token");
    }
}));
exports.default = verifyJwtToken;
