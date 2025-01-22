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
exports.createCategory = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const category_service_1 = require("../services/category.service");
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
exports.createCategory = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    if (!name) {
        throw new errorHandler_1.default(400, "Name is required");
    }
    const category = yield (0, category_service_1.createCategoryService)(name);
    if (!category) {
        throw new errorHandler_1.default(400, "Category alreay exist with this name");
    }
    return res.status(201).json(new apiResponse_1.default(201, category, "Category created successfully"));
}));
