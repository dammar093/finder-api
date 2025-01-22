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
exports.getProperties = exports.createProperty = void 0;
const asyncHandler_1 = __importDefault(require("../utils/asyncHandler"));
const cloudinary_1 = require("../utils/cloudinary");
const console_1 = require("console");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const property_service_1 = require("../services/property.service");
const apiResponse_1 = __importDefault(require("../utils/apiResponse"));
exports.createProperty = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, services, features, price, location, longitude, latitude, duration, duration_type, category_id } = req.body;
    // @ts-ignore
    const id = req.user._id;
    (0, console_1.log)(id);
    const image = req.files;
    const images = [];
    if (!title || !description || !price || !location || !longitude || !latitude || !duration || !duration_type || !services) {
        throw new errorHandler_1.default(400, "All fields are required");
    }
    if (!image) {
        throw new errorHandler_1.default(400, "Image is required");
    }
    if (image) {
        if (Array.isArray(image)) {
            for (let i = 0; i < image.length; i++) {
                const result = yield (0, cloudinary_1.uploadImage)(image[i].path);
                images.push(result);
            }
        }
        else {
            const result = yield (0, cloudinary_1.uploadImage)(image.path);
            images.push(result);
        }
    }
    const property = yield (0, property_service_1.createPropertyService)(title, description, services, price, location, longitude, latitude, true, images, duration, duration_type, category_id, id);
    if (!property) {
        throw new errorHandler_1.default(400, "Property not created");
    }
    res.status(201).json(new apiResponse_1.default(201, property, "Property created"));
}));
exports.getProperties = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const properties = yield (0, property_service_1.getPropertiesService)();
    if (!properties) {
        throw new errorHandler_1.default(404, "Properties not found");
    }
    res.status(200).json(new apiResponse_1.default(200, properties, "Properties found"));
}));
