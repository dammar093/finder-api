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
exports.updatePropertyService = exports.getPropertyService = exports.getPropertiesService = exports.createPropertiesService = void 0;
const property_model_1 = __importDefault(require("../models/property.model"));
const createPropertiesService = (title, description, services, price, location, longitude, latitude, status, images, duration, duration_type, category, user) => __awaiter(void 0, void 0, void 0, function* () {
    let property = yield property_model_1.default.create({
        title,
        description,
        services,
        price: Number(price),
        location,
        longitude: Number(longitude),
        latitude: Number(latitude),
        status,
        images,
        duration: Number(duration),
        duration_type,
        category,
        user,
    });
    return property;
});
exports.createPropertiesService = createPropertiesService;
const getPropertiesService = () => __awaiter(void 0, void 0, void 0, function* () {
    const properties = yield property_model_1.default.find().populate("category", "name").populate("user", "fullName email phoneNumber email _id profile");
    return properties;
});
exports.getPropertiesService = getPropertiesService;
const getPropertyService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield property_model_1.default.findById(id).populate("category", "_id name").populate("user", "fullName email phoneNumber email _id profile");
    return property;
});
exports.getPropertyService = getPropertyService;
const updatePropertyService = (title, description, price, location, duration, duration_type, services, id) => __awaiter(void 0, void 0, void 0, function* () {
    const property = yield property_model_1.default.findByIdAndUpdate({ _id: id }, {
        $set: {
            title,
            description,
            price,
            location,
            duration,
            duration_type,
            services
        }
    }, { new: true });
    return property;
});
exports.updatePropertyService = updatePropertyService;
