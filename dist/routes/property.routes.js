"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../utils/auth"));
const multer_1 = require("../utils/multer");
const property_controller_1 = require("../controllers/property.controller");
const router = (0, express_1.Router)();
router.post("/", auth_1.default, multer_1.upload.array("image", 5), property_controller_1.createProperty);
router.get("/", auth_1.default, property_controller_1.getProperties);
exports.default = router;
